---
title: "Programming patterns in simple words"
date: '2026-03-20 20:20:20 +0300'
creation_date: '2023-10-28 13:49:00 +0300'
tags: ["programming", "basics", "elixir"]
categories: ["Basics"]
draft: false
featuredImage: "images/featured-image.png"
description: "Core ideas behind programming patterns"
summary: "Programming patterns allow to write applications faster. This post tries to explain core idea of each pattern."
---

Patterns are just ideas how to efficiently use described features.
Each pattern shows how to solve specific task.
It is like a building block, that allows to create the application faster.
Of course, you can invent your own solution, but it will take some time.
Other developers may know the patterns too.
They will will understand your code easier.

When I approached the Patterns book at the first time it looked very difficult for me.
It contained unknown words and took much mental energy to understand what is going on.

After some years I revisited the book again.
It looked more readable for me at that time.
The book is a great source of wisdom, but it can be difficult without previous experience.

The goal of this post is to help to understand these patterns better.
It focuses mainly on beginners.
I will be glad if it will be useful for you.

Each pattern has a core idea, and understanding it is like a key.
The post does not try to replace a book, rather to give keys to understand it better.
I recommend reading a book - it should be more clear after this post.

The ideas behind patterns are universal.
It means you can apply them not only to Object-Oriented languages too.
There may be some limitations, or language-specific patterns though.

## Interface vs Implementation

We can compare interface to a concept together with its operations, and implementation to the real-world thing.
For, example we have a concept of door.
You can open it.
You can close it.
So "open" and "close" are the operations of our "door" interface.

There are many implementations of doors.
They may be brand new, they may be old and squeak on each operation.
They may be glass doors of the shop, and they may be garage doors.

All implementations share the same interface.
It would not be a door, if you could not open or close it.
At least, not a good one.

As soon as you understand the interface, it will be easier to work with any implementation.
If you know how to open the door between rooms, there is a high chance that you know how to open a kitchen door too.

Programming uses same ideas.
It tries to build application logic around generic interfaces.
It allows to keep the logic, but replace implementation details easier.

Some languages are very strict.
They refuse to work with wrong interfaces and check everything before you can start a program.


{{< figure src="images/00-duck.avif" alt="Duck on the keyboard" class="aside right" >}}

Some languages are less strict.
They do not care if you define the whole interface.
They care only if you have specific method they try to call, and check this after the program is already started.nn
Usually we call this "duck typing" - "when it walks like a duck, and speaks like a duck, then it must be a duck".

## Mutable vs Immutable structures (OOP vs FP)

Each program has 2 main parts - the data and the code to work with it.
The data is just a part of memory, somewhere inside the PC.

PC itself does not see any difference in data, but programming languages treat it differently.
They gather pieces of relevant data together and call this data structures.
Some languages allow to change the data in place (mutable data), while the others do not (immutable data).

Object-oriented languages work with objects.
Each object is just a piece of data, and operations to change it.
Usually object state is mutable - you can change it directly.

Functional languages have similar ideas.
They have data structures and code to work with them.
The main difference that usually these data structures are immutable.
If you created some data - you will not be able to change it.

Of course, some programming languages may not strictly follow these guidelines.

At first it was difficult for me to work with immutable structures, but then it clicked.
You don't need to change a structure - you can create new one.
If you can not change the data, then it is safe to share it.
So "create" operation is more efficient in functional languages - newer structures share most part of their memory.

Both Functional programming and Object-oriented ones share the same concepts - the data and the code to work with it.
This means that you can use the same programming patterns for both Object-oriented and Functional paradigms.

## Core principles of OOP

Usually you can see 3 basic principles together with OOP: encapsulation, polymorphism and inheritance.
They allow to reuse code and maintain your application a little easier.
You can live without them in many languages, though.

These principles have many definitions, but let's consider them as relations between interfaces and implementations.

### Encapsulation

This principle hides the implementation behind the interface.
It means, that user should know nothing about the implementation, but use only interface.
Sometimes it is impossible, but let's dream if it can be true.

Usually people want the doors to work properly.
They do not need to know how they work.
Only technicians are interested in this knowledge.

### Polymorphism

Means that you can swap implementaions if they share the same interface.

If a person knows how to open a wooden door, it will be easy to understand how to open metal door too.

### Inheritance

Allows to reuse parts of the implementation.

For example, we can have a decorated door.
Someone may buy a simple door and decorate it.
Most logic will remain the same, but it will look different.

## Inheritance vs Composition

Sometimes you want to extend existing implementation.
There are a couple of ways to do so.
One is inheritance, the other one is composition.

Inheritance takes the base implementation, reuses it and adds new features.
Composition gathers multiple parts together.

Inheritance works like in real life.
The person inherits qualities from their parents, and also develops new ones.
These qualities include everything - good and bad ones.
If you want to change some behaviour - you need to change it through the whole lineage.
In terms of code, one class can inherit (or extend) the other.

Composition is more like a group of people.
Each of them is unique, but they all have common goal.
Everyone is responsible for their own part, and does it well.
In terms of code, one class may contain different class and delegate some work to it.

Both interitance and composition are useful.
You don't need to pick only one, but can mix them together to get desired results.
But usually it is better to use composition over inheritance.
This allows to evolve your code faster.

## List of patterns

The implementation of some patterns may look similar, and this is fine.
They only differ by their goal.
The intention of using the pattern is the most useful part.
If you know why do we need this pattern, it will be easier to understand its implementation.

Usually patterns are not pure - they cooperate with each other.

Lets look together at the core ideas behind each pattern.
Each pattern will contain multiple sections:
- **Idea**: Describes the idea behind the pattern.
- **When**: Lists some examples.
Actually you will be able to find more, once will think about the idea.
- **How**: Some ideas how to implement the pattern.
- **Examples**: example implementations.

### Abstract Factory

{{< figure src="images/01-factory.avif" alt="road between factories with different colors" class=" right" >}}

**Idea**:
You can have different families of items with the same interface.

**When**:
For example you have a sweets shop.
It already sells candies and cookies from provider A.
You want to start selling the same products, but from provider B.
The products are very similar, but the provider API differs greatly.
We need to integrate both providers and allow future extension.
Orders should support both providers too.

**How**:
You can create multiple hierarchies of interfaces.
Each hierarchy will contain products from specific provider.
Then you can choose a provider according to your needs.
The code will work fine with both providers, because their child items share the same interface.

{{% admonition info "Elixir example" %}}

```elixir
defmodule CookieA do
  def has_chocolate?, do: false
end

defmodule CandyA do
  def with_caramel?, do: false
end

defmodule ProviderA do
  def cookie, do: CookieA
  def candy, do: CandyA
end

defmodule CookieB do
  def has_chocolate?, do: true
end

defmodule CandyB do
  def with_caramel?, do: true
end

defmodule ProviderB do
  def cookie, do: CookieB
  def candy, do: CandyB
end

defmodule Shop do
  def random_provider do
    Enum.random([ProviderA, ProviderB])
  end
end

provider = Shop.random_provider()

IO.puts("provider is #{inspect(provider)}")
IO.puts("candy with caramel? #{provider.candy().with_caramel?()}")
IO.puts("cookie has chocoloate? #{provider.cookie().has_chocolate?()}")

# The response will be either
# provider is ProviderB
# candy with caramel? true
# cookie has chocoloate? true
#
# or
# provider is ProviderA
# candy with caramel? false
# cookie has chocoloate? false
```
{{% /admonition %}}

### Adapter

{{< figure src="images/02-adapter.avif" alt="Power outlet adapter" class="right" >}}

**Idea**:
You can translate one interface to the other one.

**When**:
Fox example, you need to connect a library to an existing code.
Library should work fine, but it its interface does not match yours.

**How**:
You can create a code that translates one interface to another.

{{% admonition info "Elixir Example" %}}
```elixir
defmodule LocalPowerSupply do
  def connect_device, do: 220
end

defmodule ForeignPowerSupplyAdapter do
  def connect(%{expected_voltage: expected_voltage}) do
    voltage = LocalPowerSupply.connect_device()
    convert_voltage(expected_voltage, voltage)
  end

  defp convert_voltage(expected, actual) do
    IO.puts("converting voltage from #{actual}V to #{expected}V")
    expected
  end
end

defmodule ForeignTV do
  def turn_on(power_supply) do
    voltage = power_supply.connect(%{expected_voltage: 120})
    cond do
      voltage > 160 -> IO.puts("TV is burning")
      voltage < 80 -> IO.puts("TV does not work")
      true -> IO.puts("TV works fine")
    end
  end
end

ForeignTV.turn_on(ForeignPowerSupplyAdapter)

# The output will be
# converting voltage from 220V to 120V
# TV works fine
```
{{% /admonition %}}

### Bridge

{{< figure src="images/03-bridge.avif" alt="A bridge with a tower" >}}

**Idea**:
You can build generic algorithms using simple primitives.

**When**:
For example you want to create an algorithm library.
Its users should be able to extend it to work with any data structure.

**How**:
Extract primitive operations to one interface.
Build algorithms upon these primitives.

{{% admonition info "Elixir example" %}}
```elixir
defmodule SimpleRenderer do
  def draw_line(from, to), do: IO.puts("#{inspect(from)} -> #{inspect(to)}")
end

defmodule WideRenderer do
  def draw_line(from, to), do: IO.puts("line from #{inspect(from)} to #{inspect(to)}")
end

defmodule Shape do
  def draw_square(renderer, {x, y}, size) do
    renderer.draw_line({x, y}, {x + size, y})
    renderer.draw_line({x + size, y}, {x + size, y + size})
    renderer.draw_line({x + size, y + size}, {x, y + size})
    renderer.draw_line({x, y + size}, {x, y})
  end
end

for renderer <- [SimpleRenderer, WideRenderer] do
  Shape.draw_square(renderer, {0, 0}, 10)
end

# {0, 0} -> {10, 0}
# {10, 0} -> {10, 10}
# {10, 10} -> {0, 10}
# {0, 10} -> {0, 0}
# line from {0, 0} to {10, 0}
# line from {10, 0} to {10, 10}
# line from {10, 10} to {0, 10}
# line from {0, 10} to {0, 0}
```
{{% /admonition %}}

### Builder

{{< figure src="images/04-builder.avif" alt="assembly line for a cake" >}}

**Idea**:
You can split operation into multiple steps.

**When**:
For example you build an ORM library and want to allow user to prepare a request.
Another example is a library with lazy evalutaion.
The user may add many operations before getting a result.
You you delay their execution until user is happy with a configuration.

**How**:
The code consists from 3 parts
- data structure to keep configuration;
- code that updates this data structure;
- code that performs action with the data structure.

Pass an empty (or default) data structure and update it step by step.
Add operations that will evaluate (or build) your structure.
It may be a database request in case of ORM, or actual computation for a lazy evaluation.

{{% admonition info "Elixir example" %}}
```elixir
defmodule PipelineBuilder do
  def new(), do: []

  def add_step(pipeline, processor) do
    [processor | pipeline]
  end

  def process(pipeline, data) do
    for processor <- Enum.reverse(pipeline), reduce: data do
      new_data -> processor.(new_data)
    end
  end
end

pipeline =
  PipelineBuilder.new()
  |> PipelineBuilder.add_step(&Map.put(&1, :first, 1))
  |> PipelineBuilder.add_step(&Map.put(&1, :second, 2))
  |> PipelineBuilder.add_step(&Map.put(&1, :third, 3))

pipeline
|> PipelineBuilder.process(%{name: "example"})
|> IO.inspect()
```
{{% /admonition %}}

### Chain of Responsibility

{{< figure src="images/05-chain-of-responsibility.avif" alt="bubbles rise up from the water surface of the glass" >}}

**Idea**:
You can delegate processing to other module.

**When**:
Here are some examples for this idea.

You can find it in DOM event handlers in browser.
When user clicks a button, browser emits "click" event.
If button does is unable to handle it, browser asks button's parent to do it.
The "click" event bubbles through parents until some element handles it.
The event is ignored if no one processed it.
By the way, many elements may process the same event.

Another example is a web-server middleware.
Server has a pipeline of middlewares.
It pipes each request through these middlewares.
A middleware can modify request, or abort the whole pipeline early, if it does not like the request.

Yet another example is how dynamic programming languages (like Python or Ruby) process methods.
Interpreter knows parents for every class.
When you try to call some method, it checks if object can handle it.
If it is impossible, the interpreter searches which parent can process it.
It repeats this, until either processes a method, or raises a relevant error.

**How**:
Each element can reference own parent.
If you call some operation on the element, it can:
- process it by itself;
- delegate to partent;

{{% admonition info "Elixir example" %}}
```elixir
defmodule EventProcessor do
  defstruct [:type, :parent]

  def new(type), do: %__MODULE__{type: type}

  def set_parent(current, parent) do
    %__MODULE__{current | parent: parent}
  end

  def process_event(%__MODULE__{type: type}, type) do
    IO.puts("'#{type}' event processed")
  end

  def process_event(%__MODULE__{parent: nil}, type) do
    IO.puts("Discarding '#{type}' event")
  end

  def process_event(%__MODULE__{parent: parent}, type) do
    IO.puts("Delegate processing to '#{parent.type}'")
    process_event(parent, type)
  end
end

parent_processor = EventProcessor.new(:parent)

child_processor =
  :child
  |> EventProcessor.new()
  |> EventProcessor.set_parent(parent_processor)

EventProcessor.process_event(child_processor, :child)

# 'child' event processed


EventProcessor.process_event(child_processor, :unknown)

# Delegate processing to 'parent'
# Discarding 'unknown' event
```
{{% /admonition %}}

### Command

{{< figure src="images/06-command.avif" alt="typical UI commands in a perform a circus show" >}}

**Idea**:
You can represent operation as an item.

**When**:
For example, you work on the editor and want to implement "Undo" feature.
You can represent each editor operation as item and store it.
For example, user wants to revert the latest action.
You can take relevant item from storage and run code, that reverts operation.

Another example is collaborative software.
You can represent each user's action as item.
Software uses these items to synchronize state between users.

**How**:
Well, you need to think about these things:
1. How to represent the operation itself.
Can it be a simple constant (like user created a document), or add extra context (like position in document to delete a character).
2. How we plan to revert the operation?
What should we do with irreversible operations?
Possibly you will need to write "reverse" logic for each operation too.
3. How to store the operations?
For example, we can use stacks for this.
The most recent operation will be at the top of the stack.
Possibly you will need 2 stacks to implement a "redo" feature.
One stack is for "undo", the other one is for "redo" opeartions.

{{% admonition info "Elixir example" %}}
```elixir
defmodule UpdateValueCommand do
  defstruct [:key, :value, :previous_value]

  def new(key, value, map) do
    %__MODULE__{
      key: key,
      value: value,
      previous_value: map[key]
    }
  end

  def execute(%__MODULE__{} = op, map), do: put(map, op.key, op.value)

  def revert(%__MODULE__{} = op, map), do: put(map, op.key, op.previous_value)

  defp put(map, key, nil), do: Map.delete(map, key)
  defp put(map, key, value), do: Map.put(map, key, value)
end

defmodule MapData do
  defstruct [:data, :operations]

  def new, do:  %__MODULE__{data: %{}, operations: []}

  def set_value(%__MODULE__{} = state, key, value) do
    op = UpdateValueCommand.new(key, value, state.data)
    %__MODULE__{
      operations: [op | state.operations],
      data: UpdateValueCommand.execute(op, state.data)
    }
  end

  def revert(%__MODULE__{operations: []}), do: new()
  def revert(%__MODULE__{operations: [op|rest]} = state) do
    %__MODULE__{
      operations: rest,
      data: UpdateValueCommand.revert(op, state.data)
    }
  end

  def data(%__MODULE__{data: data}), do: data
end

data =
  MapData.new()
  |> MapData.set_value(:first, 1)
  |> MapData.set_value(:second, 2)
  |> MapData.set_value(:third, 3)

data |> MapData.data() |> IO.inspect(label: "result")
data |> MapData.revert() |> MapData.data() |> IO.inspect(label: "reverted")

# result: %{first: 1, second: 2, third: 3}
# reverted: %{first: 1, second: 2}
```
{{% /admonition %}}

### Composite

{{< figure src="images/07-composite.avif" alt="A crowd of people stand together to form a silhouette of a man" >}}

**Idea**:
A collection of items may have the same interface as a single item.

**When**:
For example, you create a drawing tool.
You can create basic shapes and move them over the canvas.
Eventually you may need to group these shapes together.
You can move the group just the same way, as you would move a single item.

Another example is processing data.
You can represent each operation as a single item.
You can group multiple operations together and represent them as a single item too.

**How**:
You need to have at least 2 types of items.
Both need to share the same interface.
The first is a simple item.
The second one is a composite one - it stores a collection of simple items.
When we call the operation on a composite item - it calls the same operation for each child component.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Item do
  defstruct [:name]

  def new(name), do: %__MODULE__{name: name}

  def print(%__MODULE__{name: name}), do: IO.write("Item(#{name})")
end

defmodule CompositeItem do
  defstruct [:items]

  def new(), do: %__MODULE__{items: []}

  def add_item(%__MODULE__{items: items}, item) do
    %__MODULE__{items: [item | items]}
  end

  def print(%__MODULE__{items: items}) do
    IO.write("CompositeItem(")

    items
    |> Enum.reverse()
    |> Enum.intersperse(", ")
    |> Enum.each(fn
      %item_module{} = item -> item_module.print(item)
      separator when is_binary(separator) -> IO.write(separator)
    end)

    IO.puts(")")
  end
end

CompositeItem.new()
|> CompositeItem.add_item(Item.new("First Item"))
|> CompositeItem.add_item(Item.new("Second Item"))
|> CompositeItem.print()

# CompositeItem(Item(First Item), Item(Second Item))
```
{{% /admonition %}}

### Decorator

{{< figure src="images/08-decorator.avif" alt="A large gift box contains smaller one" >}}

**Idea**:
You can add extra features with wrappers.

**When**:
Decorator allows you to add extra features to existing code.
For example, you want to cache the results for expensive operation.
You can create a wrapper, that returns a cached value.
You can reuse this wrapper for other operations too.

This approach also can help to add logging, parameter validation, or even their modification.
I am sure you can find more ways to use it, once you aware about it.

Some languages, like Python support decorators natively, and even have a special syntax for it.

Decorator reminds me about the "around" feature in Aspect Oriented programming (AOP).
AOP allows you to inject your code into certain places of existing one.
For example you can count a number of database requests, if you will update your counter before each one.
You don't need to have access to a code of the library for this.
"Around" feature from AOP allows to wrap any function with your own one.
You can call your own code before, after or instead the original function.

**How**:
A decorator should have the same interface as a decorated code.
Also you need to reference original implementaion from it.
When client calls a decorated code, it passess all parameters to a decorator.
The decorator runs own code and may call original implementation too.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Decorator do
  def decorate(fun) do
    fn argument ->
      IO.puts("before call")
      fun.(argument)
      IO.puts("after call")
    end
  end
end


decorated_fn = Decorator.decorate(
  fn item -> IO.inspect(item) end
)

decorated_fn.({:some, :data})

# before call
# {:some, :data}
# after call
```
{{% /admonition %}}

### Facade

{{< figure src="images/09-facade.avif" alt="Monster plays a puppet kitten" >}}

**Idea**:
You can hide the complex system behind simple interface.

**When**:
For example, you write a library.
It can be so complex, so it will be difficult to use it.
You can create a simple interface for it and add default parameters.
Of course the clients still can use advanced configuration, when necessary.

**How**:
Think about the minimal interface and sensible default settings.
Provide examples how to use both simple interface and advanced configuration.

{{% admonition info "Elixir example" %}}
```elixir
defmodule AppConfiguration do
  defstruct [:name, :modules, :plugins, :hooks]

  @doc """
  Allows to use default application settings.
  """
  def default_settings(name) do
    %__MODULE__{
      name: name,
      plugins: [default_plugin: []],
      modules: [AppConfiguration],
      hooks: []
    }
  end
end
```
{{% /admonition %}}

### Factory Method

{{< figure src="images/10-factory-method.avif" alt="Vending machine with different food" >}}

**Idea**:
You can create item inside a method and return it.

**When**:
For example, you want to initialize a large structure.
You can create a function that returns a new structure with default parameters.
The implementation will be responsible for correct item type.

**How**:
Create a method that returns item of well-known interface.
Create, configure and return the item of correct type from it.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Item do
  defstruct [:name, :features]

  def new, do: %__MODULE__{name: "default", features: [:feature1, :feature2]}
end

Item.new() |> IO.inspect()
# %Item{name: "default", features: [:feature1, :feature2]}
```
{{% /admonition %}}

### Flyweight

{{< figure src="images/11-flyweight.avif" alt="People are desperate to reach their shared goal" >}}

**Idea**:
You can reuse items.

**When**:
Usually this pattern allows to reduce number of resources.
For example, limit a number of database connections and reuse them.

Another example is to share object reference (for example ID, or memory location) instead of the object itself.

Some languages or libraries may share parts of their data structures.
This helps to speed up some operations, and reduce number of copy operations.
For example immutable linked list contains a head element, and "tail" - another list.
It is safe to share "tail" between many lists, because you are not able to change it (it is immutable).

**How**:
For example, you need to store image-like data.
It should contain array of colors.
You can store unique colors in a palette, and reference them by the palette index in the document.
You can do the same for a text document, where you can add styles to every symbol.
In most cases these styles will be the same for close characters, so you can reference styles instead of embedding them.
Generally speaking, you can create a mapping with shared items, and reference them by identifier.

Another example is a pool of resources, like a database connection pool.
A pool opens multiple database connections.
When client wants to query a database, it asks a pool for a connection.
If pool has a free connection, then it gives it to the client.
Client returns the connection back, once done their queries.
If there is no free connections, then pool just adds a client to the queue.
This client will get a connection once will be their turn.

{{% admonition info "Elixir example" %}}
```elixir
defmodule ReusableItems do
  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def get_or_create(key), do: GenServer.call(__MODULE__, {:get_or_create, key})

  def init(%{} = initial_data), do: {:ok, initial_data}

  def handle_call({:get_or_create, key}, _from, state) do
    value = Map.get(state, key, :rand.uniform())
    new_state = Map.put(state, key, value)
    {:reply, value, new_state}
  end
end

ReusableItems.start_link()

IO.puts("Example output:")
for key <- [:first, :first, :second] do
  key
  |> ReusableItems.get_or_create()
  |> IO.inspect(label: "data for key: '#{key}'")
end

# Example output:
# data for key: 'first': 0.031046405319377635
# data for key: 'first': 0.031046405319377635
# data for key: 'second': 0.9945954257283924
```
{{% /admonition %}}

### Interpreter

{{< figure src="images/12-interpreter.avif" alt="Robot tries to interpret the commands" >}}

**Idea**:
You can create a simple language and interpret it.

**When**:
For example, you need to allow clients to write custom application rules.
This can be a formula, or sequence of pre-defined operations.
You can create a small interpreter, if there are only a few operators.

The main benefit from a small interpreter comes from its main drawback.
It is very limited.
Evaluating user input may lead to security issues.
For example, a user may add unexpected character or run own code.
If you have small number of available operations - it is easier to make them secure.
Nevertheless, it is better to think how to sanitize user input, especially if you need more power, then simple interpreter.

**How**:
We can divide this into these parts:
- Available operations.
You will need a set of available operations for a simple interpreter.
- How to store operations.
This means, how to represent sequence of operations.
The simplest example is just a list.
You need to walk through each item and evaluate it.
Another example is a tree.
It allows branching, and extra logic (like "if" operator).
You can traverse this tree depth-first and perform operations of each tree node.
- Store intermediate results.
This may be useful to pass data between operations.
You can keep the results in operation context (relevant data structure).

{{% admonition info "Elixir example" %}}
```elixir
defmodule MathInterpreter do
  def calculate(number) when is_number(number), do: number
  def calculate({:+, arg1, arg2}), do: binary_operation(arg1, arg2, &(&1 + &2))
  def calculate({:-, arg1, arg2}), do: binary_operation(arg1, arg2, &(&1 - &2))
  def calculate({:*, arg1, arg2}), do: binary_operation(arg1, arg2, &(&1 * &2))

  defp binary_operation(arg1, arg2, function) do
    number1 = calculate(arg1)
    number2 = calculate(arg2)
    function.(number1, number2)
  end
end


{:+, {:-, 5, 3}, {:*, 10, 12}}
|> MathInterpreter.calculate()
|> IO.inspect(label: "result")

# result: 122
```
{{% /admonition %}}

### Iterator

{{< figure src="images/13-iterator.avif" alt="A doctor calls for the next patient" >}}

**Idea**:
You can traverse collection of items in uniform way.

**When**:
For example, you created a library of algorithms.
Algorithms are generic and need to traverse data to work properly.
It is nice to support default data structures, but it is impossible to predict all possible implementations.
That's why it would be helpful to allow library users to write implementation for their code.

Many programming languages already support this feature.
It is better to use what is already present instead of rolling your own iterators.
Usually reference includes this information.

**How**:
The iterator needs to support at least these features:
- Creating the iterator itself.
- Getting a current value.
- Moving to the next item.

{{% admonition info "Elixir example" %}}
```elixir
defmodule ListIterator do
  def new(list) when is_list(list), do: {__MODULE__, list}

  def next({__MODULE__, []}), do: :empty
  def next({__MODULE__, [head | tail]}), do: {:ok, head, new(tail)}

  def each({__MODULE__, _} = iterator, fun), do: iterator |> next() |> each(fun)
  def each(:empty, _), do: :ok
  def each({:ok, value, iterator}, fun) do
    fun.(value)
    each(iterator, fun)
  end
end

[1, 2, 3, 4, 5]
|> ListIterator.new()
|> ListIterator.each(&IO.inspect(&1 * 2))

# 2
# 4
# 6
# 8
# 10
```
{{% /admonition %}}

{{% admonition info "Elixir example" %}}
```elixir
defmodule TupleIterator do
  defstruct [:content]

  def new(content) when is_tuple(content), do: %__MODULE__{content: content}

  defimpl Enumerable do
    def member?(_, _), do: {:error, __MODULE__}

    def count(%@for{content: content}), do: {:ok, tuple_size(content)}

    def slice(%@for{content: content}) do
      slicing_fun = fn (start, length) ->
        for index <- start..start+length - 1 do
          elem(content, index)
        end
      end

      {:ok, tuple_size(content), slicing_fun}
    end

    def reduce(%@for{content: content}, acc, fun), do: do_reduce(content, 0, acc, fun)

    defp do_reduce(_tuple, _index, {:halt, acc}, _fun), do: {:halted, acc}
    defp do_reduce(tuple, index, {:suspend, acc}, fun), do: {:suspended, acc, &do_reduce(tuple, index, &1, fun)}
    defp do_reduce(tuple, index, {:cont, acc}, _fun) when tuple_size(tuple) == index, do: {:done, acc}
    defp do_reduce(tuple, index, {:cont, acc}, fun) do
      do_reduce(
        tuple,
        index + 1,
        fun.(elem(tuple, index), acc),
        fun
      )
    end
  end
end

{1, 2, 3, 4}
|> TupleIterator.new()
|> Enum.each(&IO.inspect/1)

# 1
# 2
# 3
# 4
```
{{% /admonition %}}

### Mediator

{{< figure src="images/14-mediator.avif" alt="Spider-waiter serves a web" >}}

**Idea**:
You can coordinate parts of the system through single entity.

**When**:
For example, you need to manage connections between parts of your system.
Each component can communicate directly with others.
This works fine for small number of components, but can lead to race conditions in future.

You can delegate the coordination to a dedicated component (mediator).
The components will speak only to it instead of each other.
This way the cooridination logic will be in a single place.
You can simplify the logic of connected components (but it will be more difficult for the mediator itself).

**How**:
You need to think how to represent a mediator.
The simplest way is to use the ideas from Observer pattern.
Each item notifies the mediator about changes, and mediator notifies subscribers.

Another approach is to create application-related API, and use it for communication.

{{% admonition info "Elixir example" %}}
```elixir
defmodule ChatMediator do
  use GenServer

  def start_link(participants \\ %{}), do: GenServer.start_link(__MODULE__, participants)

  def join(pid, name), do: GenServer.call(pid, {:join, name})

  def message_to(pid, to, message), do: GenServer.call(pid, {:message, to, message})

  def init(participants), do: {:ok, participants}

  def handle_call({:join, name}, {from, _ref}, state) do
    new_state = Map.put(state, name, from)
    for receiver <- Map.values(state) do
      send_message(receiver, "#{name} has joined")
    end
    {:reply, :ok, new_state}
  end

  def handle_call({:message, to, message}, _, state) do
    receiver_pid = state[to]
    if state[to] do
      send_message(receiver_pid, message)
    end

    {:reply, :ok, state}
  end

  defp send_message(to, message), do: send(to, {:message, message})
end

defmodule ChatClient do
  use GenServer

  defstruct [:chat, :name]

  def start_link(chat, name), do: GenServer.start(__MODULE__, {chat, name})

  def send_message(pid, to, message), do: GenServer.call(pid, {:send_message, to, message})

  def init({chat, name}) do
    :ok = ChatMediator.join(chat, name)
    {:ok, %__MODULE__{chat: chat, name: name}}
  end

  def handle_call({:send_message, to, message}, _, state) do
    ChatMediator.message_to(state.chat, to, [from: state.name, data: message])
    {:reply, :ok, state}
  end

  def handle_info({:message, message}, state) do
    IO.inspect(message, label: "#{state.name} received message")
    {:noreply, state}
  end
end

{:ok, chat} = ChatMediator.start_link()
{:ok, member1} = ChatClient.start_link(chat, "member1")
{:ok, member2} = ChatClient.start_link(chat, "member2")
ChatClient.send_message(member1, "member2", "ping")
ChatClient.send_message(member2, "member1", "pong")

# member1 received message: "member2 has joined"
# member2 received message: [from: "member1", data: "ping"]
# member1 received message: [from: "member2", data: "pong"
```
{{% /admonition %}}

### Memento

{{< figure src="images/15-memento.avif" alt="Projector remembers own youth" >}}

**Idea**:
You can store inner state outside.

**When**:
For example, you need to keep history of operations.
You can take a snapshot of item state and store it somewhere.
You can use it to rollback the state in future, or compute difference between states.

**How**:
You need an API to save/load state.

Sometimes even API is not necessary.
For example, if you use immutable data structure, you already store it outside the module.
You just need to pass this data as a parameter.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Memento do
  def new, do: Agent.start_link(fn -> :not_loaded end)

  def load_state(pid, data) do
    IO.puts("loading new state")
    Agent.update(pid, fn _ -> data end)
  end

  def get_value(pid, key), do: Agent.get(pid, &Map.get(&1, key))

  def put_value(pid, key, value), do: Agent.update(pid, &Map.put(&1, key, value))

  def print_state(pid), do: Agent.get(pid, &IO.inspect(&1, label: "current state"))

  def save_state(pid) do
    Agent.get(pid, &Function.identity/1)
  end
end

{:ok, pid} = Memento.new()
Memento.print_state(pid)
Memento.load_state(pid, %{first: 1})
Memento.print_state(pid)
Memento.put_value(pid, :second, 2)
Memento.get_value(pid, :second) |> IO.inspect(label: "new value")
Memento.save_state(pid) |> IO.inspect(label: "saved state")

# current state: :not_loaded
# loading new state
# current state: %{first: 1}
# new value: 2
# saved state: %{first: 1, second: 2}
```
{{% /admonition %}}

### Observer

{{< figure src="images/16-observer.avif" alt="A person feeds the birds in the park" >}}

**Idea**:
You can subscribe to changes.

**When**:
For example, you need to show a state of a sensor in a real time.
There are a couple ways to do it.
One is to periodically ask a sensor about its value.
The other one is to make sensor notify you when its state changes.

So "observer" is about observing changes.

**How**:
You need to collect subscribers.
For example, store a set of subscribers in a key-value storage.
Key will be a topic, and value - set of subscribers.
When someone subscribes to a topic, add it to corresponding set.

Pick a set of subscribers, when you need to broadcast to some topic.
Notify each subscriber about the changes.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Observer do
  def start, do: Agent.start(fn -> %{} end, name: __MODULE__)

  def subscribe(key, callback) do
    IO.inspect(key, label: "subscribing to the key")
    update(key, MapSet.new([callback]), &MapSet.put(&1, callback))
  end

  def unsubscribe(key, callback) do
    IO.inspect(key, label: "unsubscribing from key")
    update(key, MapSet.new(), &MapSet.delete(&1, callback))
  end

  def broadcast(key, value) do
    IO.inspect(%{key: key, value: value}, label: "broadcasting value")
    callbacks =  Agent.get(__MODULE__, &Map.get(&1, key, MapSet.new))

    for callback <- callbacks do
      callback.(value)
    end

    :ok
  end

  defp update(key, default, update_fn) do
    Agent.update(__MODULE__, &Map.update(&1, key, default, update_fn))
  end
end

Observer.start()
subscriber = &IO.inspect(&1, label: "first subscriber receives")
Observer.subscribe(:test, subscriber)
Observer.subscribe(:test, &IO.inspect(&1, label: "second subscriber receives"))
Observer.broadcast(:test, :first_value)
Observer.broadcast(:missing_key, :some_value)
Observer.unsubscribe(:test, subscriber)
Observer.broadcast(:test, :second_value)

# subscribing to the key: :test
# subscribing to the key: :test
# broadcasting value: %{value: :first_value, key: :test}
# first subscriber receives: :first_value
# second subscriber receives: :first_value
# broadcasting value: %{value: :some_value, key: :missing_key}
# unsubscribing from key: :test
# broadcasting value: %{value: :second_value, key: :test}
# second subscriber receives: :second_value
```
{{% /admonition %}}

{{% admonition info "Elixir example" %}}
```elixir
defmodule Observer do
  use GenServer

  def start, do: GenServer.start(__MODULE__, %{}, name: __MODULE__)

  def subscribe(key), do: GenServer.call(__MODULE__, {:subscribe, key})

  def unsubscribe(key), do: GenServer.call(__MODULE__, {:unsubscribe, key})

  def broadcast(key, value), do: GenServer.call(__MODULE__, {:broadcast, key, value})

  def init(_), do: {:ok, %{}}

  def handle_call({:subscribe, key}, {pid, _}, state) do
    ref = Process.monitor(pid)

    state =
      state
      |> Map.put(ref_key(ref), {key, pid})
      |> Map.put(pid_key(pid, key), ref)
      |> Map.update(
        subscribers_key(key),
        MapSet.new([pid]),
        &MapSet.put(&1, pid)
      )

    {:reply, :ok, state}
  end

  def handle_call({:unsubscribe, key}, {pid, _}, state) do
    IO.inspect("#{inspect(pid)} unsubscribes from #{key}", label: "observer")
    state = case Map.get(state, pid_key(pid, key)) do
      nil -> state
      ref ->
        Process.demonitor(ref, [:flush])
        Map.delete(state, ref_key(ref))
    end

    state =
      state
      |> Map.delete(pid_key(pid, key))
      |> Map.update(
        subscribers_key(key),
        MapSet.new(),
        &MapSet.delete(&1, pid)
      )

    {:reply, :ok, state}
  end

  def handle_call({:broadcast, key, value}, _from, state) do
    state
    |> Map.get(subscribers_key(key), MapSet.new())
    |> Enum.each(&send(&1, {key, value}))

    {:reply, :ok, state}
  end

  def handle_info({:DOWN, ref, :process, pid, _reason}, state) do
    state = case state[ref_key(ref)] do
      nil -> state
      {key, ^pid} ->
        IO.inspect("process #{inspect(pid)} is down, unsubcribing from #{key}", label: "observer")
        state
        |> Map.delete(ref_key(ref))
        |> Map.delete(pid_key(pid, key))
        |> Map.update(subscribers_key(key), MapSet.new(), &MapSet.delete(&1, pid))
    end

    {:noreply, state}
  end

  defp pid_key(pid, key), do: {:pid, pid, key}
  defp ref_key(ref), do: {:ref, ref}
  defp subscribers_key(key), do: {:subscribers, key}
end

defmodule Subscriber do
  use GenServer

  def start(label) do
    GenServer.start(__MODULE__, label)
  end

  def subscribe(pid, key), do: GenServer.call(pid, {:subscribe, key})

  def unsubscribe(pid, key), do: GenServer.call(pid, {:unsubscribe, key})

  def init(label), do: {:ok, label}

  def handle_call({:subscribe, key}, _, label) do
    IO.inspect("subscribing to #{inspect(key)}", label: label)
    Observer.subscribe(key)
    {:reply, :ok, label}
  end

  def handle_call({:unsubscribe, key}, _, label) do
    IO.inspect("unsubscribing from #{inspect(key)}", label: label)
    Observer.unsubscribe(key)
    {:reply, :ok, label}
  end

  def handle_info(message, label) do
    IO.inspect(message, label: label)
    {:noreply, label}
  end
end

Observer.start()
{:ok, pid1} = Subscriber.start("subscriber1")
{:ok, pid2} = Subscriber.start("subscriber2")
{:ok, pid3} = Subscriber.start("subscriber3")
Subscriber.subscribe(pid1, :common)
Subscriber.subscribe(pid1, :subscriber1)
Subscriber.subscribe(pid2, :common)
Subscriber.subscribe(pid2, :subscriber2)
Subscriber.subscribe(pid3, :common)
Subscriber.subscribe(pid3, :subscriber3)
Observer.broadcast(:subscriber1, "subscriber1-only message")
Observer.broadcast(:subscriber2, "subscriber2-only message")
Observer.broadcast(:subscriber3, "subscriber3-only message")
Observer.broadcast(:common, "common message 1")
Process.exit(pid2, :kill)
Subscriber.unsubscribe(pid3, :common)
Observer.broadcast(:common, "common message 2")

# subscriber1: "subscribing to :common"
# subscriber1: "subscribing to :subscriber1"
# subscriber2: "subscribing to :common"
# subscriber2: "subscribing to :subscriber2"
# subscriber3: "subscribing to :common"
# subscriber3: "subscribing to :subscriber3"
# subscriber3: {:subscriber3, "subscriber3-only message"}
# subscriber1: {:subscriber1, "subscriber1-only message"}
# observer: "process #PID<0.110.0> is down, unsubcribing from common"
# subscriber3: {:common, "common message 1"}
# subscriber1: {:common, "common message 1"}
# observer: "process #PID<0.110.0> is down, unsubcribing from subscriber2"
# subscriber3: "unsubscribing from :common"
# observer: "#PID<0.111.0> unsubscribes from common"
# subscriber1: {:common, "common message 2"}
```
{{% /admonition %}}

{{% admonition info "Elixir example" %}}
```elixir
defmodule Observer do
  def start do
    Registry.start_link(
      keys: :duplicate,
      name: __MODULE__,
      partitions: System.schedulers_online()
    )
  end

  def subscribe(key), do: Registry.register(__MODULE__, key, [])

  def unsubscribe(key), do: Registry.unregister(__MODULE__, key)

  def broadcast(key, value) do
    Registry.dispatch(__MODULE__, key, fn entries ->
      for {pid, _} <- entries, do: send(pid, {key, value})
    end)
  end
end

defmodule Subscriber do
  use GenServer

  def start(label) do
    GenServer.start(__MODULE__, label)
  end

  def subscribe(pid, key), do: GenServer.call(pid, {:subscribe, key})

  def unsubscribe(pid, key), do: GenServer.call(pid, {:unsubscribe, key})

  def init(label), do: {:ok, label}

  def handle_call({:subscribe, key}, _, label) do
    IO.inspect("subscribing to #{inspect(key)}", label: label)
    Observer.subscribe(key)
    {:reply, :ok, label}
  end

  def handle_call({:unsubscribe, key}, _, label) do
    IO.inspect("unsubscribing from #{inspect(key)}", label: label)
    Observer.unsubscribe(key)
    {:reply, :ok, label}
  end

  def handle_info(message, label) do
    IO.inspect(message, label: label)
    {:noreply, label}
  end
end

Observer.start()
{:ok, pid1} = Subscriber.start("subscriber1")
{:ok, pid2} = Subscriber.start("subscriber2")
{:ok, pid3} = Subscriber.start("subscriber3")
Subscriber.subscribe(pid1, :common)
Subscriber.subscribe(pid1, :subscriber1)
Subscriber.subscribe(pid2, :common)
Subscriber.subscribe(pid2, :subscriber2)
Subscriber.subscribe(pid3, :common)
Subscriber.subscribe(pid3, :subscriber3)
Observer.broadcast(:subscriber1, "subscriber1-only message")
Observer.broadcast(:subscriber2, "subscriber2-only message")
Observer.broadcast(:subscriber3, "subscriber3-only message")
Observer.broadcast(:common, "common message 1")
Process.exit(pid2, :kill)
Subscriber.unsubscribe(pid3, :common)
Observer.broadcast(:common, "common message 2")

# subscriber1: "subscribing to :common"
# subscriber1: "subscribing to :subscriber1"
# subscriber2: "subscribing to :common"
# subscriber2: "subscribing to :subscriber2"
# subscriber3: "subscribing to :common"
# subscriber3: "subscribing to :subscriber3"
# subscriber3: {:subscriber3, "subscriber3-only message"}
# subscriber1: {:subscriber1, "subscriber1-only message"}
# subscriber3: {:common, "common message 1"}
# subscriber1: {:common, "common message 1"}
# subscriber3: "unsubscribing from :common"
# subscriber1: {:common, "common message 2"}
```
{{% /admonition %}}

### Prototype

{{< figure src="images/17-prototype.avif" alt="russian doll" >}}

**Idea**:
You can clone the item instead of creating new one.

**When**:
Sometimes creating new item will require too much configuration.
It is easier to clone existing one and use it as a basic implementation.

**How**:
Create a function, to clone existing item.

{{% admonition info "Elixir example" %}}
```elixir
defmodule PrototypeItem do
  defstruct [:id, :data]

  def new(data), do: %__MODULE__{id: unique_id(), data: data}

  def clone(%__MODULE__{} = item), do: %__MODULE__{item | id: unique_id()}

  defp unique_id, do: System.unique_integer([:positive, :monotonic])
end

item = PrototypeItem.new("some data")
cloned_item = PrototypeItem.clone(item)

IO.inspect(item, label: "original item")
IO.inspect(cloned_item, label: "cloned item")

# original item: %PrototypeItem{id: 1, data: "some data"}
# cloned item: %PrototypeItem{id: 2, data: "some data"}
```
{{% /admonition %}}

### Proxy

{{< figure src="images/18-proxy.avif" alt="Hare wears a mask of a pig" >}}

**Idea**:
You can use placeholder to delay expensive operations.

**When**:
For example, you can show a placeholder instead of image.
You can load actual image, when it is required.

Another example is to show file thumbnails in a file browser.
Operating system will load the file only when you request it.

Yet another example is you can controll access with it.
For example, you see a movie streaming service.
You can preview a movie, but it will be fully available only after you purchase it.

Yet another example is to delay write operations.
Proxy may store them, and write only after some time, or amount of changes.

**How**:
You can wrap an item with a proxy.
The proxy will respond to most operations.
It will delegate changes to main resource only after calling a specific method, or other criteria is met.

{{% admonition info "Elixir example" %}}
```elixir
defmodule ProxyImage do
  defstruct [:url, :data, loaded?: false]

  def new(url), do: %__MODULE__{url: url}

  def preview(%__MODULE__{loaded?: false} = state) do
    IO.puts("show preview placeholder")
    state
  end

  def preview(%__MODULE__{} = state) do
    IO.puts("show preview of #{state.data}")
    state
  end

  def render(%__MODULE__{loaded?: false} = state) do
    state
    |> load_image()
    |> render()
  end

  def render(%__MODULE__{} = state) do
    IO.puts("show #{state.data}")
    state
  end

  defp load_image(%__MODULE__{} = image) do
    IO.puts("loading image from #{image.url}")
    data = "image from #{image.url}"
    %__MODULE__{image | data: data, loaded?: true}
  end
end

"http://some.url.com/image.jpg"
|> ProxyImage.new()
|> ProxyImage.preview()
|> ProxyImage.render()
|> ProxyImage.preview()

# show preview placeholder
# loading image from http://some.url.com/image.jpg
# show image from http://some.url.com/image.jpg
# show preview of image from http://some.url.com/image.jpg
```
{{% /admonition %}}

### Singleton

{{< figure src="images/19-singleton.avif" alt="A king surrounded by his knights" >}}

**Idea**:
You can limit the number of items in the system.

**When**:
For example, you want a globally unique database service.
It must be created only once.
All other parts of code will use it.

**How**:
General idea is to create API that does not support multiple instances.
System delegates processing of these API calls to a single item.

{{% admonition info "Elixir example" %}}
```elixir
defmodule SingletonCounter do
  def start_link, do: Agent.start_link(fn -> 0 end, name: __MODULE__)

  def value, do: Agent.get(__MODULE__, & &1)

  def increment, do: Agent.update(__MODULE__, &(&1 + 1))
end

SingletonCounter.start_link()

SingletonCounter.value() |> IO.inspect(label: "initial value")
SingletonCounter.increment()
SingletonCounter.increment()
SingletonCounter.value() |> IO.inspect(label: "changed value")

# initial value: 0
# changed value: 2
```
{{% /admonition %}}

### State

{{< figure src="images/20-state.avif" alt="A policeman joyfully knits during a peaceful time" >}}

**Idea**:
You can delegate operations to the inner state.

**When**:
For example, you need to support a stateful connection.
When you established a connection, will differ from unconnected one.

Another example is a state machine.
Each state should support different operations.

When the state changes, the items seems to be completely different.

**How**:
Delegate the operations to the inner state.
You may also need some way to transition between states.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Connected do
  def print_state, do: IO.puts("connected")
  def connect, do: IO.puts("already connected")
  def send_data(data), do: IO.puts("sending data: #{inspect(data)}")
  def disconnect, do: IO.puts("disconnecting")
end

defmodule Disconnected do
  def print_state, do: IO.puts("disconnected")
  def connect, do: IO.puts("connecting")
  def send_data(data), do: IO.puts("unable to send data: #{inspect(data)}")
  def disconnect, do: IO.puts("already disconnected")
end

defmodule Connection do
  defstruct [:connection]

  def new(), do: %__MODULE__{connection: Disconnected}

  def print_state(%__MODULE__{} = state) do
    state.connection.print_state()
    state
  end

  def connect(%__MODULE__{} = state) do
    state.connection.connect()
    %__MODULE__{connection: Connected}
  end

  def send_data(%__MODULE__{} = state, data) do
    state.connection.send_data(data)
    state
  end

  def disconnect(%__MODULE__{} = state) do
    state.connection.disconnect()
    %__MODULE__{connection: Disconnected}
  end
end

Connection.new()
|> Connection.print_state()
|> Connection.send_data("example_data")
|> Connection.connect()
|> Connection.print_state()
|> Connection.connect()
|> Connection.send_data("example_data")
|> Connection.disconnect()
|> Connection.disconnect()

# disconnected
# unable to send data: "example_data"
# connecting
# connected
# already connected
# sending data: "example_data"
# disconnecting
# already disconnected
```
{{% /admonition %}}

### Strategy

{{< figure src="images/21-strategy.avif" alt="2 red buttons, and a hand choosing between them" >}}

**Idea**:
You can swap algorithms.

**When**:
For example, you want to render some items, or to train a ML model.
The client's hardware may differ, and you need different algorithms according to it.
You can create a generic interface and some implementations.
So, you can delegate logic to these algorithms instead of adding conditional statements.

**How**:
You need to create an interface for algorithm.
Create modules with algorithm implementations.
Pass the algorithm as constructor or configuration parameter.

{{% admonition info "Elixir example" %}}
```elixir
defmodule Odd do
  def print(item), do: IO.inspect(item, label: "odd")
end

defmodule Even do
  def print(item), do: IO.inspect(item, label: "even")
end

defmodule SwitchingStrategy do
  defstruct [algorithm: Odd]

  def new, do: %__MODULE__{}

  def print(%__MODULE__{} = state, item) do
    state.algorithm.print(item)
    %__MODULE__{state | algorithm: toggle_algorithm(state.algorithm)}
  end

  defp toggle_algorithm(Odd), do: Even
  defp toggle_algorithm(Even), do: Odd
end

for number <- [1, 2, 3, 4], reduce: SwitchingStrategy.new() do
  strategy -> SwitchingStrategy.print(strategy, number)
end

# odd: 1
# even: 2
# odd: 3
# even: 4
```
{{% /admonition %}}

### Template Method

{{< figure src="images/22-template-method.avif" alt="A witch brews a potion according to the recipe" >}}

**Idea**:
You can allow to override parts of the algorithm.

**When**:
You may want to allow clients to extend algorithm, run some validations before or after some action.
For example, you write a CMS and want to allow developers to extend it via plugins.
CMS will have extension points, and plugins may use them.

**How**:
One approach is to create some methods in the base class.
Children will be able to override a default action.

Another approach is to use something similar to observer pattern.
You can create special hooks for main lifecycle methods.
Plugins will be able to register and run own code there.

{{% admonition info "Elixir example" %}}
```elixir
defmodule BaseClass do
  @callback to_number(any()) :: String.t()

  defmacro __using__(_) do
    quote do
      @behaviour BaseClass

      def sum(items), do: items |> Enum.map(&to_number/1) |> Enum.sum()
    end
  end
end

defmodule Item do
  use BaseClass

  defstruct [:amount]

  def new(amount), do: %__MODULE__{amount: amount}

  @impl BaseClass
  def to_number(%__MODULE__{amount: amount}), do: amount
end

[1, 2, 3]
|> Enum.map(&Item.new/1)
|> Item.sum()
|> IO.inspect(label: "sum")

# sum: 6
```
{{% /admonition %}}

### Visitor

{{< figure src="images/23-visitor.avif" alt="Man tipping his hat" >}}

**Idea**:
The item may decide which method to call during iteration.

**When**:
For example, you create a food shop basket.
It can contain items in different units.
Some of them may be capacity (e.g. in litres), mass (e.g. kilogram) or quantity (just items).
You want to calculate total price.
Each item knows about own unit and can adjust price by itself.

So, each item can decide which operation to call during the iteration.

**How**:
Each item should support a "visit" operation.
When you iterate over the items, you call the "visit" operation of each item and pass a "visitor" to it.
Each item will call required operation of the "visitor".

{{% admonition info "Elixir example" %}}
```elixir
defmodule Visitor do
  def process_single_item(name, price) do
    IO.puts("#{name}: #{price}")
    price
  end

  def process_multiple(name, price, amount) do
    total = price * amount
    IO.puts("#{name}: #{amount} x #{price} = #{total}")
    total
  end
end

defmodule Item do
  defstruct [:name, :amount, :price]

  def new({name, amount, price}) do
    %__MODULE__{name: name, amount: amount, price: price}
  end

  def visit(%__MODULE__{} = state, visitor) do
    visitor.process_multiple(state.name, state.price, state.amount)
  end
end

defmodule Total do
  def visit(price, visitor) do
    visitor.process_single_item("total", price)
  end
end

[{"candy", 10, 0.1}, {"cookie", 3, 5.0}]
|> Enum.map(&Item.new/1)
|> Enum.map(&Item.visit(&1, Visitor))
|> Enum.sum()
|> Total.visit(Visitor)

# candy: 10 x 0.1 = 1.0
# cookie: 3 x 5.0 = 15.0
# total: 16.0
```
{{% /admonition %}}

## Similarity in patterns

Sometimes you can use one pattern to implement the other.
For example, you can use idea of composite (a collection of items behaves like one item) to implement operation for interpreter (create simple language).
So, a collection of interpreter operation may behave like a single operation.

Another example is to implement mediator (coordination via a single entity) via observer (subscribe to changes).
So, you can coordinate parts of the system by subscribing to relevant changes.

Sometimes patterns may have similar code.
For example, bridge (build features from simple primitives) and strategy (swap algorithm to change behaviour).
Both of them may delegate operations to other module.
These patterns only differ in their intention.
Bridge focuses on the idea that you can break a feature to simple parts, and develop them independently.
Strategy just tells that you can change an algorithm according to the context.

Sometimes it is difficult to find pure patterns in real-world applications.
This means, the code may share multiple ideas at the same time.
This is perfectly fine.

## Next steps

So, each pattern has a simple idea behind it.
Hope this article helped to understand these ideas, and it will help you to become a better developer.
These ideas are universal, and you can apply them in many languages.
Sometimes you can apply them in your day-to-day life too.

The next step would be to get a book of patterns and start reading it (if you did not do it yet).
Usually if you want to master a new skill, it is better to apply your knowledge, or explain it to other people.
This gives better results than mere reading.

Bye!
