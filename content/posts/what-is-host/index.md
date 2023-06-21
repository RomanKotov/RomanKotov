---
title: "What is host? Baby don't port me"
date: '2023-06-21 11:08:12 +0300'
tags: ["programming", "basics"]
categories: ["Basics"]
draft: false
featuredImage: "featured-image.png"
description: "Network system basics"
summary: "An overview of network system components."
---

When I learn some new web framework, I start with some tutorials or official documentation.
Eventually it says something like: "open a shell, type this and you can see the results at `http://localhost:3000/`".
Let’s sort out what it means.

When you open a shell and type some command from your tutorial, it starts an application.
We call it a "Web Server"[^WebServer].
The `http://localhost:3000/` string is an an Uniform Resource Identifier, or URI[^URI].
This term is closely related to the computer networks.
It describes the way to communicate with our server, and follows this format: `{scheme}://{host}:{port}{path}`.
URI can have other parts too, but let's keep it simple in this article.

So, for our case:
- `http` part is a scheme.
- `localhost` is a host.
- `3000` is a port.
- `/` is a path.

[^WebServer]: [Wikipedia about Web Server](https://en.wikipedia.org/wiki/Web_server).
[^URI]: [Wikipedia about URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier).

{{% admonition note "Note" %}}
The goal of this article is to explain how network works.
It shows only basic concepts, and does not touch many edge cases.
It also covers some common pitfalls and ways to overcome them.
This artice has no goal to be a complete guide.
Curious reader can use footnotes and dig deeper into the topic.
{{% /admonition %}}

## Computer network basics

The main purpose of computer networks is to transfer some data.
Computer network is a part of Internet Protocol Suite[^InternetProtocolSuite].
It consists of multiple layers, that work together.
We can compare it to the postal service.
Let's introduce our main characters:
1. Application.
It is a part of Application layer[^ApplicationLayer].
The application wants to communicate, and other network parts help with it.
1. Post office.
It is a part of Operating System, responsible for all network communications.
It helps applications to send and receive messages.
It is a part of Transport layer[^TransportLayer].
1. Each post office has a delivery service.
This service is responsible for message delivery and work on the Internet Layer[^InternetLayer].
1. The cities and the roads.
They are the building blocks for the network and a part of Link Layer[^LinkLayer].

[^InternetProtocolSuite]: [Wikipedia about Internet protocol suite](https://en.wikipedia.org/wiki/Internet_protocol_suite).
[^ApplicationLayer]: [Wikipedia about Application Layer](https://en.wikipedia.org/wiki/Application_layer).
[^TransportLayer]: [Wikipedia about Transport Layer](https://en.wikipedia.org/wiki/Transport_layer).
[^InternetLayer]: [Wikipedia about Internet Layer](https://en.wikipedia.org/wiki/Internet_layer).
[^LinkLayer]: [Wikipedia about Link Layer](https://en.wikipedia.org/wiki/Link_layer).

{{< figure src="house.svg" alt="A house with a text 'PC' on it." class="aside right" >}}

A PC is like a large house.
It is lifeless, until an Operating System[^OperatingSystem] brings it to life.
The Operating System is like a manager for all PC's resources.
It converts a PC to the sweet home for applications.

An application lives in the Operating System.
When one application wants to communicate with the other from a different PC, it writes a message.
Then it takes a message to the post office, and gives it to a post office manager.
It also gives the recipient information, own contacts and picks a delivery method.
Then the post office manager prepares everything for the delivery service.
The delivery service goes directly to the receiver's post office, if it is in the same city.
It can relay the message via intermediate post offices, if the receiver is too far away.

[^OperatingSystem]: [Wikipedia about Operating System](https://en.wikipedia.org/wiki/Operating_system).

{{< figure src="jigsaw.svg" alt="An envelope as a jigsaw puzzle." class="aside left" >}}

A post office usually has only letter envelopes.
Such envelope can contain only a couple of pages.
So, post office copies the message, and splits it into the pieces, that fit a letter envelope.
Delivery service delivers these letters.
The receiver's post office gets all those pieces and tries to recreate a message from them, like a jigsaw puzzle.
The original message is discarded after the transmission is over.

{{< figure src="missing_letter.svg" alt="A missing letter notice." class="aside right" >}}

If the data is valuable, the sender picks a "Transmission Control Protocol", or TCP[^TCP] delivery method.
The post office will be paid only when the whole message is delivered without changes or missing pieces.
Sometimes the roads are bad, so some pieces are lost.
The delivery service has to go back to office and copy the missing pieces again.
Then it delivers the missing pieces.
Such delivery can take much time, especially with bad roads.

[^TCP]: [Wikipedia about TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol).

{{< figure src="disposed_letter.svg" alt="A letter with letters 'UDP' in the trash bin." class="aside left" >}}

Sometimes the letter is not very valuable, or sender wants to deliver it as fast as possible.
The sender picks a "User Datagram Protocol", or UDP[^UDP] for this case.
The post office will be paid even for an attempt to deliver a message.
It will not even check if every piece reached the destination or some were lost along the way.
It is much faster than previous one.
It may be useful when you need the data as fast as possible, or when only the latest data matters.
We can see this in real-time applications like media streaming, or playing online games.
These kind of services value speed and tolerate missing letters.

[^UDP]: [Wikipedia about UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol).

## Scheme

{{< figure src="scroll.svg" alt="A scroll with text 'HTTP or not HTTP?' on it." class="aside right" >}}

Scheme is a language of the message.
Sender and recipient agree on their communication language.
Post office does not care about the content of the letter.
Well, it should not.
It cares about delivery only and follows the same approach for all types of letters.

{{< figure src="spam.svg" alt="A criminal looks out of the envelope." class="aside left" >}}

Sometimes servers receive suspicious or unexpected messages.
Some servers throw them out, the other ones call the police.
Some servers are too sensitive - they may freeze, faint or even start doing crazy things after receiving such strange letters.

There are many schemes in the wild[^ListOfURISchemes].
For example, web servers usually understand `http` or `https` (secure `http`) ones.
If the scheme is missing, an application tries to guess it.
Usually browsers start with more secure protocol (`https`) and move to less one (`http`) if it was not successful.

[^ListOfURISchemes]: [Wikipedia about list of URI schemes](https://en.wikipedia.org/wiki/List_of_URI_schemes).

## Host

{{< figure src="door.svg" alt="A glowing door." class="aside right" >}}

The host is a network address.
Network is like a city.
The network address, or IP address[^IPAddress] is just an address inside the city.
But our city is a magical one.
It looks more like a large parking lot, than the traditional one.
Some cities are real, the other ones are imaginary.
For example, a PC can build own internal city.
A post office can reach the city by a special device - network interface[^NetworkInterface].
It is like a magical portal, or door to the PC.
One side of it is inside some city, the other one is the entrance to the post office.
Usually a PC leaves such portals in different cities.
Each portal has own identifier - Media Access Control address (MAC address[^MAC]).

[^IPAddress]: [Wikipedia about IP address](https://en.wikipedia.org/wiki/IP_address).
[^NetworkInterface]: [Wikipedia about Network Interfaces](https://en.wikipedia.org/wiki/Network_interface).
[^MAC]: [Wikipedia about MAC address](https://en.wikipedia.org/wiki/MAC_address).

{{% admonition note "Note" %}}
Please, note the difference between **IP address**, and the **MAC address**.
IP address is the property of a network, and can change over time.
The MAC address is like a passport of the network interface.
It allows to identify each one, and it should not change, though operating systems allow to do it.
{{% /admonition %}}

{{< figure src="brochure.svg" alt="Brochure with useful numbers and a key." class="aside left" >}}

Some cities have useful services.
When a PC visits a city, it goes directly to the mayor and asks where to put its portal.
The mayor looks if there are free places.
Then it asks for the portal documents (MAC), assigns an IP address to the portal and prepares a rental contract.
The PC will need to renew the contract from time to time, otherwise it looses the address.
After the contract is signed, the mayor gives a map of all city sights, information how to connect to the Internet and other goodies.
This is called Dynamic Host Configuration Protocol or DHCP[^DHCP].

[^DHCP]: [Wikipedia about DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol).

Other cities are much simpler.
When PC visits them, it needs to claim IP address by itself.
We call it a `static` IP address assignment.
Sometimes it leads to conflicts, especially when someone has already taken the address.

The post offices of different PCs like to work together.
They can talk only to the neighbours.
If the recipient is too far away, they use city post offices to relay the messages.
Post offices use MAC addresses to transmit a data inside the city.
To discover a MAC address, a post office manager looks out of the portal and shouts the IP address very loudly.
If another citizen hears own IP address, it shouts own MAC address.
After it they become aquainted and write contact data to a special table.
Now they know how to reach each other inside the city.
They will use their their tables instead of shouting the next time.
This process is called Address Resolution Protocol, or ARP[^ARP].

{{< figure src="bullhorn.svg" alt="Employee looks out of the door and shouts in bullhorn." >}}

[^ARP]: [Wikipedia about ARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol).

{{< figure src="heart.svg" alt="A heart with a text 'localhost' on it." class="aside right" >}}

Some PCs are not connected to network so do not have a real IP address.
Still each PC has a very special virtual network.
It uses the loopback interface[^Loopback] to connect to it.
The most famous IP address from it is `127.0.0.1`, or `localhost`[^Localhost].
PCs do not allow to access this network from the outside.
If a PC talks about `localhost` - it talks about **its own** localhost, not someone else's one.
When the post office tries to deliver a message to the `localhost` - the message never leaves a PC.

[^Loopback]: [Wikipedia about the Loopback](https://en.wikipedia.org/wiki/Loopback).
[^Localhost]: [Wikipedia about the Localhost](https://en.wikipedia.org/wiki/Localhost).

{{% admonition note "Note" %}}
The address `127.0.0.1` is an IPv4 address.
It has an IPv6 counterpart - `0:0:0:0:0:0:0:1`, or `::1` in shorter form.
{{% /admonition %}}

{{% admonition warning "Warning" %}}
I want to stress, that each PC has own `localhost`.
If you have started your application on `127.0.0.1` on the first PC, you will not be able to access it from the second one.
If you try to access localhost on the second PC, the second PC will try to connect to itself.
Usually this is a source of many connectivity issues during deployment.
{{% /admonition %}}

### Types of network addresses

The post office understands only specific kinds of network addresses.
It uses MAC address to deliver mail inside the city.
It uses IP address to send data across networks.
Here are the examples of IP addresses:
- `8.8.8.8` - IPv4 address[^IPv4].
- `2001:0db8:0000:0000:0000:ff00:0042:8329` (the same as `2001:db8::ff00:42:8329`) - IPv6 address[^IPv6].

[^IPv4]: [Wikipedia about IPv4](https://en.wikipedia.org/wiki/Internet_Protocol_version_4).
[^IPv6]: [Wikipedia about IPv6](https://en.wikipedia.org/wiki/IPv6).

Both IPv4 and IPv6 addresses have shorter form.
For example a PC understands, IPv4 `127.1` as `127.0.0.1`[^IPv4Short].
It also understands that `::1` is a `0:0:0:0:0:0:0:1` IPv6 address[^IPv6Short].
Multiple consecutive zeros can be omitted.

[^IPv4Short]: [How Linux converts IPv4 address](https://man7.org/linux/man-pages/man3/inet_aton.3.html).
[^IPv6Short]: [Wikipedia about IPv6 address representation](https://en.wikipedia.org/wiki/IPv6_address#Representation).

It is difficult for humans to remember IP addresses.
So they created a special system for post offices.
It allows to give readable (sometimes also meaningful) names to IP addresses.
For example name `dns.google.com` has IP address of `8.8.8.8`.

When a post office receives a letter, it reads the destination address.
It tries to deliver a the mail at once, if it understands the address.
If it has a portal to the recipient's city, it gives the message to the delivery service.
Delivery service uses MAC address to navigate the city.

{{< figure src="book.svg" alt="A book with a text '/etc/hosts' on it." class="aside left" >}}

The process is more complicated, if the address is in human-readable format.
A post office manager needs to translate it first.
At first he uses a special dictionary.
It contains all human-readable names the operating system knows, together with their IP addresses.
The name of the dictionary depends on the operating system.
It is `/etc/hosts` for macOS and Linux and `c:\Windows\System32\Drivers\etc\hosts` for Windows.
A basic set of addresses includes only `127.0.0.1 localhost`.
The manager picks the first matching IP address from dictionary and continues delivery.
This process is very fast.

{{% admonition note "Note" %}}
Each postal office believes that the dictionary is always correct.
It will use the address from it, even if the address is wrong.

Some operating system owners change it to test some networking configurations.

The other can even use this dictionary to block unwanted or harmful sites.
They assign a wrong address for some human-readable name of unwanted site.
For example they can assign `127.0.0.1` to some advertisement site.
The postal service tries to deliver a letter to a wrong address.
It finds no one at home, reports an issue and disposes the letter.

This dictionary also can be used for harmful purposes.
For example, a virus can replace a bank address with a fake one.
It is better to take care about it.
{{% /admonition %}}

{{< figure src="phone.svg" alt="Old phone with letters 'DNS' on it." class="aside right" >}}

If there is no such name in the dictionary, the postal manager continues to search it in Domain Name System (or DNS[^DNS]).
DNS is a large company that helps to translate human-readable names into IP addresses.
A site can change their addresses from time to time.
For example, a it can move to other PC, or just forget to pay a city rent and receive a new address.
The site informs DNS about such changes, so the information is fresh and up to date.
DNS has a hierarchy.
If the DNS employee is not able to translate the name, he calls own manager.
If the manager does not know the name, he calls own manager.
This repeats until someone either helps with translation, or no one knows about the address.

[^DNS]: [Wikipedia about DNS](https://en.wikipedia.org/wiki/Domain_Name_System).

A post office manager opens his phonebook of translators and calls the first one.
If the first translator did not help, the manager calls the second one and so on.
This process takes more time, than dictionary lookup.
A post office will try to deliver a message when finds the address.
It will fail, if there is no such address.

### Public and private networks

Internet[^Internet] is a network of networks.
The network is like a city, where each citizen may be a smaller network by itself.
Larger network is like a country - it contains multiple cities.
Internet is a global network - it contains multiple country-level ones.

[^Internet]: [Wikipedia about Internet](https://en.wikipedia.org/wiki/Internet).


Terms "public" and "private" networks are relative.
Sometimes we also call these networks "external" or "internal".
A PC uses the same type of portals to access both types, and sees no difference between them.
These terms just mean different visibility levels.
For example, we have 3 networks - A, B, and C:
- Every PC from the A can see no PCs from B and C.
  Network A is public relative to networks B and C.
- Every PC from B can see every PC from A, but sees no PCs from C.
  Network B is public relative to network C, but private for network A.
- Every PC from C can see all PCs from A and B.
  Network C is private to both A and B.

{{< figure src="towers.svg" alt="Two towers. Lower one with letter B. Higher one is with letter C. Higher one is on the top of the lower one. Letter A standing outside of the towers." >}}

Gateway[^Gateway] is a device that allows to transfer data between networks.
For example, router[^Router] is a gateway too.
Usually we use router to connect to WiFi.
We can compare the router to the mayor of the tower.
It creates internal network (city) for all connected devices.
It provides many useful services for the citizens: gives them addresses (DHCP), helps with translating human-readable names (DNS), etc.
The router is also the citizen of the external network.
It uses external network to connect to the Internet.

[^Gateway]: [Wikipedia about Gateway](https://en.wikipedia.org/wiki/Gateway_(telecommunications)).
[^Router]: [Wikipedia about Router](https://en.wikipedia.org/wiki/Router_(computing)).

{{< figure src="address.svg" alt="A letter with corrected address." class="aside left" >}}

We can say that each citizen hides behind the router.
Router has own post office.
This office has two addresses - one is internal (or private), the other is external (or public).
If any citiezen wants to send a message to the outer world, it goes to the router's post office.
If the recipient is from the same city, the router just sends a postman with the letter.
Otherwise a post office writes down the internal address of the sender into own book.
Then it replaces private message address with the public address of the router.
After it the post office sends a changed letter via public network.
The post office checks the addresses of all incoming letters, and replaces them back to private ones.
This is called Network Address Translation or NAT[^NAT].

[^NAT]: [Wikipedia about NAT](https://en.wikipedia.org/wiki/Network_address_translation).

Private networks can use IP addresses from special ranges.
We call them "Private"[^PrivateNetwork].
These addresses are not unique globally.
It means, that multiple routers can create private networks with same address ranges.
The Internet is very large.
Now it has more devices, then IPv4 can support[^IPv4Exhaustion].
IPv6 was invented to help with this limitation.
IPv4 uses private networks as a workaround.
The example of private network is `192.168.1.0/24`.
The `/24` part shows the possible number of addresses inside the network[^CIDR].

[^PrivateNetwork]: [Wikipedia about private networks](https://en.wikipedia.org/wiki/Private_network).
[^IPv4Exhaustion]: [Wikipedia about IPv4 address exhaustion](https://en.wikipedia.org/wiki/IPv4_address_exhaustion).
[^CIDR]: [Wikipedia about Classes Inter-Domain Routing (CIDR)](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

Some IP addresses should be unique globally.
These "global" IP addresses include all possible addresses, except private and other special ones[^SpecialAddresses].
The IP address is a part of the network, and is useless without it.
Actually a PC can assign any IP address to own network interface.
It does not mean that everyone can find a PC by that address.

[^SpecialAddresses]: [Wikipedia on special addresses](https://en.wikipedia.org/wiki/Internet_Protocol_version_4#Special-use_addresses).

Some PCs can create toy networks inside themselves.
They use it for development, deployment, or just for fun.
These toy cities contain imaginary (virtual) PCs, assign private addresses to them.
These addresses will be visible and have some meaning only inside the parent PC.
No one will see them from outside.

{{< figure src="contract.svg" alt="A contract." class="aside right" >}}

Some of the PC applications are businesspeople.
They provide services to others and need to communicate with their customers.
They go to the post office of the PC, after creating their company.
A post office creates a contract for them.
The contract includes an IP address and a port (will discuss a port later).
Every customer coming from that IP address can reach the application, according to the contract.
Then a company starts to wait for the clients - "listen" on that network address.
For example, a PC has address of `192.168.1.20`, and application starts to listen on this address.
It means, that the application will serve only the customers, that came from `192.168.1.20`.
All other will be ignored.

### Catch-all address

{{< figure src="advertisement.svg" alt="Advertisement with '0.0.0.0' on it." class="aside left" >}}

Usually a company listens at only one network interface.
But some companies are big.
They are ready to accept customers from all networks a PC has.
A PC has a special offer for such VIP clients.
It is address `0.0.0.0`.
If a company rents this address, it rents all the PCs addresses at the same time.
Clients will be able to reach the application, no matter what portal they came from.
For example, our PC has 3 IP addresses - A, B and C.
If the application rents address `0.0.0.0`, the clients can reach it by addresses A, B and C.

{{% admonition note "Note" %}}
The `0.0.0.0` is IPv4 address.
It has an IPv6 counterpart - `0:0:0:0:0:0:0:0` or `::` in shorter form.
{{% /admonition %}}

This is useful for the situations when PC changes its addresses frequently.
For example, when a laptop switches from wired to a WiFi connection, or connects to the other router.
PC and application can keep the existing contract, without any changes.

This address is also our hero, when we deploy applications.
For example, we use containers.
Usually container address is unknown beforehand, depends on PC and can change after re-deploy.
If you have issues with connecting to the service, try using `0.0.0.0` as an application listening address.

{{% admonition note "Tip" %}}
Some applications have a very sensitive data.
For example, a database without a password, or with default one.
It is safer to keep such applications away from `0.0.0.0`, if you do not trust your network.
Anyone will be able to connect and use it, and you will not even know about this.
The safest option is to give access only to the required resources.

If you choose a listening address, try to think who will connect to it.
For example:
- If no other PC needs to connect to it, pick `127.0.0.1`.
  This is the safest option.
- If your PC does not change address frequently - use a specific address instead of `0.0.0.0`.
  If your PC has multiple network addresses - better pick private one, if it fits you.
- If the PC changes addresses frequently or it is inside the container - pick `0.0.0.0`.
  Also you can do it if you know what you do, or your life is just too booring.
{{% /admonition %}}

## Port

{{< figure src="mailbox.svg" alt="A mailbox." class="aside right" >}}

Port[^Port] is a number.
It can be from `0` to `65535`.
It is like a mailbox number in the post office.
When the application starts listening, it rents a mailbox.
A post office ensures that application receives correct messages.
An application can rent multiple ports at the same time, but it requires multiple contracts.

[^Port]: [Wikipedia about Port](https://en.wikipedia.org/wiki/Port_(computer_networking)).

A post office allows to rent an unique port to only one application.
It will refuse to create a contract for the same port, but other application.
A post office checks if the port is free by these parameters:

1. An IP address.

  A port belongs to a single IP address.
  If applicaiton wants to listen multiple addresses, it creates own contract for each one.

  There is a specific case for address `0.0.0.0` (listening on all available addresses).
  If application wants to listen on `0.0.0.0`, the post office checks if the port is free on all addresses.
  It will not allow to listen on `0.0.0.0` if some application already uses that port.
  For example, our PC has 3 addresses A, B and C.
  First application rented a port `80` on address A.
  The second application wants to rent port `80` on `0.0.0.0`.
  The post office will not allow to do it, as this port is not free on address A.
  The second application can pick another port.
  Otherwise it may create separate contracts for port `80` on addresses B and C.

2. An transport layer protocol.

  A post office sees difference between messages from TCP and UDP protocols.
  This means a port number should be unique for a protocol.
  Each protocol can have up to `65535` ports.
  Post office allows to use the same port, but different protocol.
  For example, one DNS provider rented a port `53` on `0.0.0.0` for UDP protocol.
  A post office will allow its competitor to rent a port `53` on `0.0.0.0`, but for TCP.

3. A version of IP protocol.

  A PC sees difference between IPv4 and IPv6 addresses.
  `0.0.0.0` relates to all IPv4 addresses - it does not touch any IPv6 address.
  `::` is an IPv6 counterpart of `0.0.0.0` - it mentions only IPv6 addresses.

So, a post office requires these parameters to deliver a message:
- The recipient IP address.
- The recipient port number.
- A delivery protocol (TCP, UDP, etc.).
- It also notes the information about the sender.
  This helps to deliver responses.

### Firewall

{{< figure src="guard.svg" alt="A security guard stands in front of the door." class="aside right" >}}

Usually a PC has many open ports.
Some applications may be outdated or vulnerable, and they allow to hack your PC.
Firewall[^Firewall] is a type of application.
It is like the security guard that sits between the post office and its portals.
It checks incoming and outgoing messages, and blocks connections to unexpected ports.
This helps to keep your PC safe.
If the guard blocks valid messages, you may need to tell him about your application.

[^Firewall]: [Wikipedia about Firewall](https://en.wikipedia.org/wiki/Firewall_(computing)).

{{% admonition note "Tip" %}}
The safest option is to open only required ports on your PC.
A firewall may block incoming connections, but it is better not to rely on it.
You may turn it off someday and forget to turn it on again.
This will leave your PC vulnerable.
{{% /admonition %}}

### Port ranges

The ports from `0` to `1023` are special.
Usually Operating Systems use these ports to talk to each other.
Any application requires a special permission use them.
Usually post office allows only system applications to rent them.
Other applications can rent remaining ports (`1024` to `65535`).

Some applications like to rent the same ports on different PCs.
It happens so frequently, that we can assume the type of application according to the open port.
For example, `http` protocol ususally uses port `80`, `https` port `443`.
We call them "well-known ports"[^WellKnownPorts].

[^WellKnownPorts]: [Wikipedia about Well Known Ports](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers).

### Port 0

This port is reserved.
It should not be used for general communication.
The post office will be surprised to see a letter to port `0`.
It may be some misconfiguration or security issue.
Oficially you can not connect to the port `0`.

{{< figure src="dice.svg" alt="A die." class="aside left" >}}

If the application needs a random port, it can rent port `0`.
The post office allows to rent it, but not to connect to it.
When the application rents port `0`, the post office finds a random one, for example `465142`.
Then it creates a contract for this port.
The application then starts to listen on `465142` port, though asked for `0`.

When application rents port `0`, it may be difficult for others to find it.
I have used this feature in tests.
I needed to run multiple web applications at the same time.
Each test had own server, so they did not conflict with each other.
I did not need to write a code to pick a free random port.
So, port `0` allowed me to save much time on running a test suite.

## Path

{{< figure src="opened_letter.svg" alt="An opened letter with text 'GET / HTTP 1.1' inside it." class="aside right" >}}

The path is a part of URI, but not the part of network address.
When application writes a message, it includes path somewhere inside it.
Post office even does not know about it.
If the message is confidential, the post office will not even be able to read it.
The receiving application decides what to do with path by itself.
In our example we have a web application, and URI has a path of `/`.

## Typical connection issues

### I am not able to reach my application

For example, you develop the web application on your PC.
It works perfectly in your browser.
Eventually you want to test it from your mobile phone.
You enter the same address in mobile browser, as in PC, but there is no site.

Things to check:
- Are my phone and PC in the same network? -
  They may not see each other in different networks.
  For example mobile phone uses cellular data, and PC is connected to a router.
  Ensure that both devices see each other.
  It should be OK if you use your phone as an Access Point for a PC - they are in the same network.
  The phone is a router in such case.
- Do I try to connect to `localhost` from the phone? -
  A mobile phone is also a computer, and it has own `localhost`.
  It tries to connect to **own** `localhost`, but **not** to the `localhost` of your PC.
  Try to find an IP address of your PC and connect to it.
  Getting it depends on your Operating System.
  Usually you can find it out by typing `ifconfig` on Linux and macOS, or `ipconfig` in Windows shells.
  If it did not work, try to search in the Internet about it.
  When you know the IP address of your PC, replace the `localhost` part of URI with it.
  For example, the IP of your PC is `192.168.1.20`, and the URI is `http://localhost:3000`.
  The address will become `http://192.168.1.20:3000` after such replacement.
- Does my application listen on `127.0.0.1`? -
  The PC will allow clients only from `127.0.0.1` in this case.
  This means, you can connect to your application only from your PC.
  It will block all other connections.
  Search the docs for your server about how to change the listening address.
  It depends on your framework and programming language.
  Also you can search for something similar to `127.0.0.1` in your project.
  Replace it with an IP address of your PC (for example `192.168.1.20`) or `0.0.0.0` and restart the server.
- Does your PC use a firewall? -
  A firewall may block incoming connections.
  Search the ways to configure it.
  It depends on the operating system and installed applications.
- Do I use the right URI? -
  Double check the URI for typos.

### I was able to reach the application, but it looks strange

You finally reached your application, but it shows the errors, or looks different than on PC.
It is better to fix them or at least understand their source.
The solutions depend on your programming language, framework, configuration, etc.
The issues may appear again, when try to deploy the application in future.
Tips to fix these issues:
- Usually local debugging is easier than remote.
  Try to reproduce and fix the issues locally on your PC.
  For example, use the same URI on your PC, as you use on your phone.
- Usually web site connects to many servers at the same time.
  If your application misses some images, styles, or looks really strange - possibly it can not reach some server.
  Try to use developer tools from browser to identify and fix connection issues.
- Sometimes there is just no mobile design for your application.
  It will look strange on the phone in such case.
  It is up to you whether to fix this.

## Conclusion

Hope the artice helped you to build a mental model about network parts and how they work together.
I will be glad if it will help you to become more effective with web development.
Feel free to deepen your knowledge by yourself.

Bye!

{{< figure src="bye.svg" alt="A letter waves its hand." >}}
