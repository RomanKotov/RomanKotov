---
title: "Elixir module registry via Protocols"
date: '2021-10-27 13:07:35 +0300'
tags: ["Elixir", "programming"]
categories: ["Elixir"]
draft: false
author: "Roman Kotov"
authorLink: "https://romankotov.com"
description: "Example how to create module registry in Elixir"
aliases: ['/articles/elixir-module-registry-via-protocols.html']
---

The core idea of this article is that elixir protocols have a very interesting [reflection feature](https://hexdocs.pm/elixir/1.12/Protocol.html#module-reflection):

```elixir
SomeProtocol.__protocol__(:impls)
```

It can return the following results:

```elixir
:not_consolidated
# Or
{:consolidated, implementations}
```

This method lists available implementations when the Protocol is consolidated.

## Where this can help

This feature can be useful when you need to create a registry for modules. Let's  consider a couple of examples:

### Model serialization/deserialization

I was creating a [mopidy](https://mopidy.com) API wrapper in elixir to  play a music in our office. I did not find a websocket implementation for it, so decided to create a simple one by myself.

I needed to convert JSON-RPC models to elixir structs and back.

I was thinking about a way to register available models. A conversion may be implemented with a simple map like:

```elixir
%{
  "model_1" => Module1,
  "model_2" => Module2,
}
```

I decided to search for extra solutions according to these criteria:
- People usually forget to update explicit mappings. Model registration should be automated.
- I should be able to extend models with extra functions.
- Model definition should be brief and easy to understand.
- I would like to store one model per file.
- It would be nice to have all the models at compile time.
- Easy to write seialization/deserialization for extra formats.

Initial solution did not match all these criteria, but it was good enough. You can find it later in this article.

After some time a similar task appeared. I reviewed a previous solution and decided to research a little bit more, and liked the result better. Here is a simplified example of the core ideas:

```elixir
defprotocol ModelExample.ModelProtocol do
  @spec name(t()) :: String.t()
  def name(data)
end

defmodule ModelExample.Model do
  alias ModelExample.ModelProtocol

  defmacro __using__(name: name, fields: fields) do
    quote do
      Module.register_attribute(
        __MODULE__,
        :model_name,
        persist: true
      )

      @model_name unquote(name)
      defstruct unquote(fields)

      defimpl ModelExample.ModelProtocol do
        def name(_), do: unquote(name)
      end
    end
  end

  defimpl ModelProtocol, for: Atom do
    def name(module) do
      :attributes
      |> module.__info__()
      |> Keyword.get(:model_name, [])
      |> List.first()
    end
  end

  def registered_models() do
    models =
      case ModelProtocol.__protocol__(:impls) do
        {:consolidated, modules} ->
          modules

        _ ->
          Protocol.extract_impls(
            ModelProtocol,
            :code.lib_dir()
          )
      end

    for model <- models,
        model.__info__(:attributes)
        |> Keyword.has_key?(:model_name),
        into: %{},
        do: {ModelProtocol.name(model), model}
  end

  def deserialize(%{name: name, params: params}) do
    registered_models()
    |> Map.fetch!(name)
    |> struct!(params)
  end

  def serialize(data) do
    %{
      name: ModelProtocol.name(data),
      params: Map.from_struct(data)
    }
  end
end

defmodule ModelExample.Sample1 do
  use ModelExample.Model,
    name: "sample1",
    fields: [:field1, :field2]
end

defmodule ModelExample.Sample2 do
  use ModelExample.Model,
    name: "sample2",
    fields: [
      number_field: 1,
      binary_field: "example"
    ]
end

# iex> ModelExample.Model.serialize(%ModelExample.Sample1{field1: 1, field2: 2})
# %{name: "sample1", params: %{field1: 1, field2: 2}}

# iex> ModelExample.Model.deserialize(%{name: "sample1", params: %{field1: 1, field2: 2}})
# %ModelExample.Sample1{field1: 1, field2: 2}
```

### Tagged modules

When I was searching for a solution of model serialization task, I tried to solve it through tagging modules. You can also implement tagging with module registry, like this:

```elixir
defprotocol TagExample.Tagged do
  @spec tags(t()) :: [atom()]
  def tags(data)
end

defmodule TagExample.Tag do
  alias TagExample.Tagged

  defmacro __using__(_opts) do
    quote do
      Module.register_attribute(
        __MODULE__,
        :tag,
        persist: true,
        accumulate: true
      )

      defimpl TagExample.Tagged do
        def tags(_) do
          :attributes
          |> @for.__info__()
          |> Keyword.get(:tag, [])
        end
      end
    end
  end

  defimpl Tagged, for: Atom do
    def tags(module) do
      :attributes
      |> module.__info__()
      |> Keyword.get(:tag, [])
    end
  end

  @spec tagged_modules() :: [module()]
  def tagged_modules do
    modules =
      case Tagged.__protocol__(:impls) do
        {:consolidated, modules} ->
          modules

        _ ->
          Protocol.extract_impls(
            Tagged,
            :code.lib_dir()
          )
      end

    for module <- modules,
        module.__info__(:attributes)
        |> Keyword.has_key?(:tag),
        do: module
  end

  @spec modules_with_tag(tag :: atom()) :: [module()]
  def modules_with_tag(tag) do
    for module <- tagged_modules(),
        module
        |> Tagged.tags()
        |> Enum.member?(tag),
        do: module
  end
end

defmodule TagExample.TaggedModule1 do
  use TagExample.Tag

  @tag :tag1
  @tag :tag2
end

defmodule TagExample.TaggedModule2 do
  use TagExample.Tag

  @tag :tag2
  @tag :tag3
end

# iex> TagExample.Tag.tagged_modules()
# [TagExample.TaggedModule2, TagExample.TaggedModule1]

# iex> TagExample.Tag.modules_with_tag(:tag2)
# [TagExample.TaggedModule2]

# iex> TagExample.Tag.modules_with_tag(:nonexisting_tag)
# []
```

## Implementation challenges

I have learnt some new things while working on these examples. Let's look at them:

### Empty protocol

It turns out that you can create an empty protocol, and even implement it, but it will lead to a compile-time warning:

```elixir
defprotocol EmptyProtocol do
end

defimpl EmptyProtocol, for: Atom do
end

# warning: module EmptyProtocol is not a behaviour (in module EmptyProtocol.Atom)
#  lib/empty_protocol.ex:4: EmptyProtocol.Atom (module)
```

I would recommend to add some functions to the protocol, but empty one will be enough if you want to use it as a registry.

### Consolidation and dev mode

`SomeProtocol.__protocol__(:impls)` worked fine on my PC while I was creating simple scripts. It's return value always was `{:consolidated, implementations}`. It began to return `:not_consolidated` after I started to integrate it with Phoenix. I was able to consolidate protocol in development mode by running `recompile` from `iex` session.

Every file change turned the protocol back to `:not_consolidated`, so I had to trigger recompilation manually every time.

After some research I started to use [Protocol.extract_impls/2](https://hexdocs.pm/elixir/1.12/Protocol.html) for not consolidated protocol. This solution is much less performant, because it has to scan all module paths.

There is a tweak to reduce a number of [consolidation paths](https://github.com/elixir-lang/elixir/blob/a64d42f5d3cb6c32752af9d3312897e8cd5bb7ec/lib/mix/lib/mix/tasks/compile.protocols.ex#L111), but it will not help to match the performance of consolidated variant. It just skips standard library paths.

I would recommend using a consolidated version in production and `Protocol.extract_impls/2` in development.

### Persisting attributes

Both example solutions persisted their values in module attributes. These attributes will be erased after compilation, and their values will be inlined into the code. If you need to access them from the outside of the module, you can persist them with:

```elixir
Module.register_attribute(
  __MODULE__,
  :attribute_name,
  persist: true
)
```

Persisting module attributes may be enough for demo purposes, but it is better to pick another approach for production systems, like creating a module function or adopting some behaviour. [Module attributes docs](http://erlang.org/doc/reference_manual/modules.html#module_info-1) state that they may become empty.

> The list of attributes becomes empty if the module is stripped with the beam_lib(3) module (in STDLIB).

It is better to use them with caution in production.

### `Defimpl` for structure and for atom

I have also learnt one interesting and slightly confusing thing for elixir protocols. For example:

```elixir
defprotocol DefimplExample.Protocol do
  @spec some_method(t()) :: :ok
  def some_method(data)
end

defmodule DefimplExample.ModuleImplementation do
  defimpl DefimplExample.Protocol do
    def some_method(_), do: :ok
  end
end

defmodule DefimplExample.StructImplementation do
  defstruct [:some_attribute]
  
  defimpl DefimplExample.Protocol do
    def some_method(_), do: :ok
  end
end

# iex> DefimplExample.Protocol.some_method(DefimplExample.ModuleImplementation)
# ** (Protocol.UndefinedError) protocol DefimplExample.Protocol not implemented for DefimplExample.ModuleImplementation of type Atom. This protocol is implemented for the following type(s): DefimplExample.StructImplementation, DefimplExample.ModuleImplementation
#     lib/defimpl_example.ex:1: DefimplExample.Protocol.impl_for!/1
#     lib/defimpl_example.ex:3: DefimplExample.Protocol.some_method/1

# iex> DefimplExample.Protocol.some_method(DefimplExample.StructImplementation)
# ** (Protocol.UndefinedError) protocol DefimplExample.Protocol not implemented for DefimplExample.StructImplementation of type Atom. This protocol is implemented for the following type(s): DefimplExample.StructImplementation, DefimplExample.ModuleImplementation
#     lib/defimpl_example.ex:1: DefimplExample.Protocol.impl_for!/1
#     lib/defimpl_example.ex:3: DefimplExample.Protocol.some_method/1

# iex> DefimplExample.Protocol.some_method(%DefimplExample.ModuleImplementation{})
# ** (CompileError) iex:1: DefimplExample.ModuleImplementation.__struct__/1 is undefined, cannot expand struct DefimplExample.ModuleImplementation. Make sure the struct name is correct. If the struct name exists and is correct but it still cannot be found, you likely have cyclic module usage in your code
#    (stdlib 3.13) lists.erl:1354: :lists.mapfoldl/3

# iex> DefimplExample.Protocol.some_method(%DefimplExample.StructImplementation{})
# :ok
```

Let's consider calling protocol for these cases:
- **Module name**. It is an atom by nature, so protocol will search an implementation for Atom. If you don't have one, you will get an error.
- **Structure**. If you implement a protocol for a structure (`DefimplExample.StructImplementation`), you will be able to call it only like `%DefimplExample.StructImplementation{}`. Calling a protocol with module name will also result in error.

I would recommend creating a separate implementation for `Atom` if you plan to support plain modules without structures, as well as structure modules by themselves. In other case you may end up with unreachable code, or use protocol only for tagging purposes.

### Infinite loop with `@for`

Another observation is related to the `@for`. [According to the documentation](https://hexdocs.pm/elixir/1.12/Protocol.html#module-multiple-implementations):

> Inside defimpl/3, you can use @protocol to access the protocol being implemented and @for to access the module it is being defined for.

Let's consider an example:

```elixir
defprotocol ForExample.Protocol do
  @spec some_method(t()) :: :ok
  def some_method(data)
end

defimpl ForExample.Protocol, for: Atom do
  def some_method(_), do: :ok
end

defmodule ForExample.Implementation do
  defstruct [:attribute]

  defimpl ForExample.Protocol do
    def some_method(_), do: some_method(@for)
  end
end

# iex> ForExample.Protocol.some_method(ForExample.Implementation)
# :ok

# iex> ForExample.Protocol.some_method(%ForExample.Implementation{})
# infinite loop
```

`@for` here points to the `ForExample.Implementation` module. Module name is an atom, so, calling a function with it should call an implementation for Atom. But actually it calls not the protocol implementation, but the function itself. This leads to infinite tail-recursive loop in our example.

To actually call a protocol, you can do something like this:

```elixir
defmodule ForExample.Implementation do
  defstruct [:attribute]

  defimpl ForExample.Protocol do
    def some_method(_), do: @protocol.some_method(@for)
  end
end

# iex> ForExample.Protocol.some_method(%ForExample.Implementation{})
# :ok
```

### Overriding implementations

It turned out that if you try to define defimpl multiple times for the same module, the last one will overwrite previous ones, and also show a warning about it.

```elixir
defprotocol OverrideExample.Protocol do
  @spec some_method(t()) :: :ok
  def some_method(data)
end

defimpl OverrideExample.Protocol, for: Atom do
  def some_method(:original), do: :ok
end

defimpl OverrideExample.Protocol, for: Atom do
  def some_method(:override), do: :ok
end

# warning: redefining module OverrideExample.Protocol.Atom (current version loaded from _build/dev/lib/test/ebin/Elixir.OverrideExample.Protocol.Atom.beam)
#  lib/override_example.ex:10

# iex> OverrideExample.Protocol.some_method(:override)
# :ok

# iex> OverrideExample.Protocol.some_method(:original)
# ** (FunctionClauseError) no function clause matching in OverrideExample.Protocol.Atom.some_method/1
#
#    The following arguments were given to OverrideExample.Protocol.Atom.some_method/1:
#
#       # 1
#       :original
#
#    Attempted function clauses (showing 1 out of 1):
#
#        def some_method(:override)
#
#    lib/override_example.ex:11: OverrideExample.Protocol.Atom.some_method/1
```

I would recommend to implement a protocol only once per data type. This should protect you from future surprises.

## Alternative implementations

You can also implement a module registry with other approaches:

### Map

The most simple solution. The only issue with it, that you, or other maintainer should remember to keep this map up to date.

### Enumerating modules

[Module enumeration](https://elixirforum.com/t/getting-a-list-of-tagged-modules/3804/11) was one of the first things I have found.

```elixir
defmodule Tagged do
  def list_tagged_modules do
    {:ok, modules} = :application.get_key(Application.get_application(__MODULE__), :modules)
    Enum.filter(modules, &is_tagged/1)
  end
  
  defp is_tagged(mod) do
    :attributes
    |> mod.__info__()
    |> Keyword.has_key?(:tag)
  end
end
```

It works fine, but requires listing and checking of every module, so is not very performant. Performance issue may be solved with:

### Runtime cache

The idea here is to create a mapping in runtime, and to cache it with something like:

- [Registry](https://hexdocs.pm/elixir/1.12/Registry.html)
- [ETS](https://elixir-lang.org/getting-started/mix-otp/ets.html) or [DETS](https://erlang.org/doc/man/dets.html)
- [mnesia](https://erlang.org/doc/man/mnesia.html) 
- [GenServer](https://hexdocs.pm/elixir/1.12/GenServer.html)
- [Agent](https://hexdocs.pm/elixir/1.12/Agent.html)
- [Application get_env](https://hexdocs.pm/elixir/1.12/Application.html#get_env/3) or their runtime analogs. [This approach is not recommended for libraries](https://hexdocs.pm/elixir/master/library-guidelines.html#avoid-compile-time-application-configuration).
- possibly some other similar approach.

Cache will surely help with lookup performance, but can introduce cache invalidation issues and extra complexity.

### Compile-time module workarounds

Here I have attached an initial solution for model serialization task.

```elixir
defmodule MopidyWS.Models.Generator do
  defmacro defmodel(model_name, fields: fields) do
    model_keys = fields |> Keyword.keys()
    model_name_str = model_name |> Macro.to_string()

    quote do
      defmodule unquote(model_name) do
        defstruct unquote(model_keys)

        @type t() :: %__MODULE__{unquote_splicing(fields)}

        defimpl Jason.Encoder, for: __MODULE__ do
          def encode(data, opts) do
            data
            |> Map.from_struct()
            |> Map.put("__model__", unquote(model_name_str))
            |> Jason.Encode.map(opts)
          end
        end
      end

      def deserialize(data = %{"__model__" => unquote(model_name_str)}) do
        model_data =
          for key <- unquote(model_keys) do
            {key, data["#{key}"] |> deserialize}
          end

        struct(unquote(model_name), model_data)
      end
    end
  end
end

defmodule MopidyWS.Models do
  import MopidyWS.Models.Generator, only: [defmodel: 2]

  defmodel(Ref,
    fields: [
      name: String.t() | nil,
      type: String.t() | nil,
      uri: String.t() | nil
    ]
  )

  defmodel(Track,
    fields: [
      uri: String.t() | nil,
      name: String.t() | nil,
      artists: list(MopidyWS.Models.Artist.t()),
      album: MopidyWS.Models.Album.t() | nil,
      composers: list(MopidyWS.Models.Artist.t()),
      performers: list(MopidyWS.Models.Artist.t()),
      genre: String.t() | nil,
      track_no: integer() | nil,
      disc_no: integer() | nil,
      date: String.t() | nil,
      length: integer() | nil,
      bitrate: integer() | nil,
      comment: String.t() | nil,
      muzicbrainz_id: String.t() | nil,
      last_modified: String.t() | nil
    ]
  )

  defmodel(Album,
    fields: [
      uri: String.t() | nil,
      name: String.t() | nil,
      artists: list(MopidyWS.Models.Artist.t()),
      num_tracks: integer() | nil,
      num_discs: integer() | nil,
      date: String.t() | nil,
      muzicbrainz_id: String.t() | nil
    ]
  )

  defmodel(Artist,
    fields: [
      uri: String.t() | nil,
      name: String.t() | nil,
      shortname: String.t() | nil,
      muzicbrainz_id: String.t() | nil
    ]
  )

  defmodel(Playlist,
    fields: [
      uri: String.t() | nil,
      name: String.t() | nil,
      tracks: list(MopidyWS.Models.Track.t()) | nil,
      last_modified: integer() | nil
    ]
  )

  defmodel(Image,
    fields: [
      uri: String.t() | nil,
      width: integer() | nil,
      height: integer() | nil
    ]
  )

  defmodel(TlTrack,
    fields: [
      tlid: integer() | nil,
      track: MopidyWS.Models.Track.t() | nil
    ]
  )

  defmodel(SearchResult,
    fields: [
      uri: String.t() | nil,
      tracks: list(MopidyWS.Models.Track.t()) | nil,
      artists: list(MopidyWS.Models.Artist.t()) | nil,
      albums: list(MopidyWS.Models.Album.t()) | nil
    ]
  )

  def deserialize(result) when is_map(result) do
    for {key, value} <- result, into: %{} do
      {key, deserialize(value)}
    end
  end

  def deserialize(result) when is_list(result), do: result |> Enum.map(&deserialize/1)
  def deserialize(result), do: result
end
```

After the macroexpansion we will get something like this:

```elixir
defmodule MopidyWS.Models do

  defmodule Ref do
    defstruct [:name, :type, :uri]

    @type t() :: %__MODULE__{
      name: String.t() | nil,
      type: String.t() | nil,
      uri: String.t() | nil
    }

    defimpl Jason.Encoder, for: __MODULE__ do
      def encode(data, opts) do
        data
        |> Map.from_struct()
        |> Map.put("__model__", "Ref")
        |> Jason.Encode.map(opts)
      end
    end
  end

  def deserialize(data = %{"__model__" => "Ref"}) do
    model_data =
      for key <- [:name, :type, :uri] do
        {key, data["#{key}"] |> deserialize}
       end

    struct(unquote(model_name), model_data)
  end

  defmodule Track do
    # autogenerated model code
  end

  def deserialize(data = %{"__model__" => "Track"}) do
    # deserialization code for Track model
  end

  # other models

  def deserialize(result) when is_map(result) do
    for {key, value} <- result, into: %{} do
      {key, deserialize(value)}
    end
  end

  def deserialize(result) when is_list(result), do: result |> Enum.map(&deserialize/1)
  def deserialize(result), do: result
end
```

I see the following drawbacks with it:
- It creates multiple modules in the same file.
- It relies on the order of macros evaluation, otherwise `deserialize` function will not work properly.
- Any extra code in the model will require more metaprogramming.
- If I will add any other function between calls of  `defmodel`, it will show warnings. It does not show them yet, because allows to create modules between function heads.

## Conclusion
This was a nice journey, where we have learnt how to use elixir protocol as a module registry, with some edge cases. We have also discussed ways to achieve similar results. Thanks for reading!
