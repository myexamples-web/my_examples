# Lambda 

### Arten von Lambda Ausdrücken

| Interface           | Parameter | Rückgabe  | Methodenname | Verwendung          |
|---------------------|-----------|-----------|--------------|---------------------|
| `Runnable`          | Keine     | `void`    | `run()`      | Threads, Tasks      |
| `Supplier<T>`       | Keine     | `T`       | `get()`      | Lazy Init, Factory  |
| `Consumer<T>`       | `T`       | `void`    | `accept()`   | forEach, Ausgabe    |
| `BiConsumer<T,U>`   | `T, U`    | `void`    | `accept()`   | Map.forEach         |
| `Function<T,R>`     | `T`       | `R`       | `apply()`    | map, Transform      |
| `BiFunction<T,U,R>` | `T, U`    | `R`       | `apply()`    | compute, merge      |
| `Predicate<T>`      | `T`       | `boolean` | `test()`     | filter, Bedingungen |
| `UnaryOperator<T>`  | `T`       | `T`       | `apply()`    | replaceAll          |
| `BinaryOperator<T>` | `T, T`    | `T`       | `apply()`    | reduce, min, max    |

### Syntax zum definieren eines Lamda Ausdrucks

```java
//Grundsyntax
//(Parameterliste mit typen) -> {Anweisungen}   

import java.util.List;
import java.util.function.Consumer;

Consumer<String> print = (String s) -> {
    System.out.println(s);
};

/*
 * Klammer um Parameter können weggelassen werden wenn es nur einen Parameter gibt
 * und die Typen können auch weggelassen werden da sie vom Compiler erkannt werden können
 * und wenn es nur eine Anweisung gibt können auch die geschweiften Klammern weggelassen werden
 */
Consumer<String> print2 = s -> System.out.println(s);

// Man kann auch die Methodenreferenz verwenden 

Consumer<String> print3 = s -> System.out::println;
```

### Wichtigsten Methoden um mit Lamdas zu arbeiten

#### forEach

Signatur

```java
public abstract void forEach(java.util.function.Consumer<? super T> action);
```

Bedeutet ein forEach nimmt einen Consumer als Parameter somit hat es einen Parameter T und <span style="color: red">keinen </span> rückgabewert siehe die Tabelle oben

führt somit nur eine Aktion aus für jedes Element in dem Stream

```java
List<String> list = List.of("a", "b", "c");
list.forEach(s -> System.out.println(s));
// Oder Kürzer 
list.forEach(System.out::println);
```
#### map
Signatur

```java
public abstract <R> Stream<R> map(java.util.function.Function<? super T,? extends R> mapper);
``` 

Bedeutet ein map nimmt eine Function als Parameter somit hat es einen Parameter T und einen Rückgabewert R siehe die Tabelle oben

führt somit eine umwandlung vor von T zu R für jedes Element in dem Stream aus und gibt einen neuen Stream zurück

Es ist auch möglich das T und R denn gleichen Typ haben dann spricht man von einem UnaryOperator siehe die Tabelle oben
```java
List<String> list = List.of("a", "b", "c");
List<String> upperCaseList = list.stream().map(s -> s.toUpperCase()).toList();
// Oder Kürzer
List<String> upperCaseList2 = list.stream().map(String::toUpperCase).toList();
```

#### filter

Signatur

```java
public abstract Stream<T> filter(java.util.function.Predicate<? super T> predicate);
``` 

Bedeutet ein filter nimmt einen Predicate als Parameter somit hat es einen Parameter T und einen Rückgabewert boolean siehe die Tabelle oben
führt somit eine bedingung für jedes Element in dem Stream aus und gibt einen neuen Stream zurück der nur die Elemente enthält die die Bedingung erfüllen

```java
List<String> list = List.of("a", "b", "c");
List<String> filteredList = list.stream().filter(s -> s.equals("a")).toList();
// Oder Kürzer
List<String> filteredList2 = list.stream().filter("a"::equals).toList();
```

#### Literatur
- Der Weg zum Java Profi Auflage 5
- - Kapitel 4 (S.199)
- [Java Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)