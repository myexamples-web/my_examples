# Innere Klassen

## Anmerkung 

Methodenlokale und Anonyme innere Klassen werden hier nicht behandelt da meiner meinung nach irrelevant

## "Normale innere Klassen"

- Innere Klasse kann auf alle Attribute der äußeren Klasse zugreifen 
- hat eine Referenz auf die äußere Klasse somit kann die instanz nicht ohne instanz der oberklasse existieren siehe instanzierung

```java
public class Outer{
    // Klassen inhalt 
    public class Inner {
        // Inhalt
    }
}

```

Instanzierung 

```java
Outer.Inner inner = new Outer().new Inner();
```

## Statische innere Klassen

- Kann nur auf statische Attribute der Oberklasse zugreifen
- ist losgelöst von der referenz der Oberklasse 

```java
public class Outer{
    // Inhalt 
    public static class StaticInner{
        // Inhalt
        public int i = 10;
    }
}
```

Instanzierung 

```java
Outer.Inner inner = new Outer.Inner();
```


## Allgemein über innere Klassen

- Innere Klassen können <span style="color: red">Jede </span> sichtbarkeit haben 
- Die erreichbarkeit der inneren Klasse ist vorstellbar wie der Pfad der sichtbarkeiten also erstmal die sichtbarkeit der äußeren und dann der inneren Klasse 

  
