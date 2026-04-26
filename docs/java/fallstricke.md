# Fallstricke 

### Iterator 

Man darf bei einem Iterator nicht die methode `remove` aufrufen von [Collection](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collection.html) da dies zu einer ConcurrentModificationException führt 

man muss stattdessen die `remove` methode des [Iterators](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collection.html) aufrufen

```java
import java.util.Iterator;
public class Main {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>("Das","geht","nicht");
            Iterator<String> iterator = list.iterator();

            while(iterator.hasNext()){
                String element = iterator.next();
                if(element.equals("geht")){
                   list.remove(element); // ConcurrentModificationException
                }
            }
        }
}
```

```java
import java.util.Iterator;
public class Main {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>("Das","geht");
            Iterator<String> iterator = list.iterator();        
    
            while(iterator.hasNext()){
                String element = iterator.next();
                if(element.equals("geht")){
                   iterator.remove(); // Kein Fehler
                }
            }
        }
}
```

desweiteren ist ein Doppeltere `remove` auch nicht erlaubt da dies zu einer IllegalStateException führt 

```java
import java.util.Iterator;
public class Main {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>("Das", "geht");
            Iterator<String> iterator = list.iterator();

            while (iterator.hasNext()) {
                String element = iterator.next();
                if (element.equals("geht")) {
                    iterator.remove(); // Kein Fehler
                    // iterator.next() muss vorerst aufgerufen werden
                    iterator.remove(); // IllegalStateException
                }
            }
        }
}
```

### Thread sichere Iteration

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = List.of("A", "B", "C");
        List<String> syncList = Collections.synchronizedList(list);

        synchronized (syncList) {
            for (String element : syncList) {
                // Verarbeitung des Elements
            }
        }
    }
}
```