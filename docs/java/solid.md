# Solid Principals

### Single Responsibility Principle (SRP)

- Eine Klasse sollte nur eine einzige Verantwortung bzw. Aufgabe haben 

#### Antibeispiel:

<span style="color: red"> 
Weil der Controller sowohl Anfragen entgegennimmt als auch die Businesslogik enthält
</span>

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AntiController {
    @GetMapping("/request")
    public void handleRequest() {
        handleRequestService();
    }

    private void handleRequestService() {
        // Business logic
    }
}
```

### Open/Closed Principle (OCP)

- Die Software sollte offen sein für erweiterung aber geschlossen für änderungen

#### Antibeispiel:

<span style="color: red"> 
Erweiterung der Klasse AntiShape erfordert Änderungen an der calculateArea Methode
</span>

```java
public class AntiShape {
    public double calculateArea(Object shape) {
        if (shape instanceof Circle) {
            Circle circle = (Circle) shape;
            return Math.PI * Math.pow(circle.getRadius(), 2);
        } else if (shape instanceof Rectangle) {
            Rectangle rectangle = (Rectangle) shape;
            return rectangle.getWidth() * rectangle.getHeight();
        }
        throw new IllegalArgumentException("Unknown shape");
    }
}
```

### Liskov Substitution Principle (LSP)

- Eine Unterklasse sollte eine Oberklasse ohne Probleme ersetzen können

#### Antibeispiel:

<span style="color: red"> 
Weil die Unterklasse Square die Methode setWidth und setHeight überschreibt, führt dies zu
unerwartetem Verhalten, wenn sie als Rectangle verwendet wird
</span>

```java
public class Rectangle {
    protected double width;
    protected double height;
    
    public void setWidth(double width) {
        this.width = width;
    }
    
    public void setHeight(double height) {
        this.height = height;
    }
    
    public double getArea() {
        return width * height;
    }
    
}

public class Square extends Rectangle {
    @Override
    public void setWidth(double width) {
        this.width = width;
        this.height = width; // Square hat gleiche Breite und Höhe
    }
    
    @Override
    public void setHeight(double height) {
        this.height = height;
        this.width = height; // Square hat gleiche Breite und Höhe
    }
}
```

### Interface Segregation Principle (ISP)

- Clients sollten nicht gezwungen sein, Schnittstellen zu implementieren, die sie nicht verwenden
- Daraus folgt lieber mehrere kleine Interfaces statt ein riesen Interface 

#### Antibeispiel:

<span style="color: red">
Ein Drucker der Farbdruck nicht unterstützt müsste dieses trotzdem implementieren
</span>

```java
public interface AntiPrinter {
    void printBlackAndWhite(String content);
    void printColor(String content);
}
```

### Dependency Inversion Principle (DIP)

- Keine Abhängigkeiten von konkreten Klassen, sondern von Abstraktionen (Interfaces oder abstrakte Klassen)

#### Antibeispiel:

<span style="color: red">
Weil die Klasse AntiService direkt von der konkreten Implementierung AntiRepository abhängt, ist
es schwierig, die Implementierung zu ändern oder zu testen, ohne die AntiService-Klasse zu modifizieren
</span>

```java
public class AntiRepository {
    public String fetchData() {
        return "Data from repository";
    }
}
```

besser mit Dependency injection [siehe](https://de.wikipedia.org/wiki/Dependency_Injection)

#### Literatur
- Der Weg zum Java Profi Auflage 5
- - Kapitel 3.5.3 (S.167)