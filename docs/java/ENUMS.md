# Enums 

### Ein Enum ist eine aufzählung die mit werten belegt sein kann

```java
private enum ErrorState{
        OK (0,"Ok", 100), 
        ERROR (1,"Error", 200),
        UNKNOWN(2,"Unknown", 300);
        
        private final int value;
        private final String description;
        private final int ladezeit;
        
        private ErrorState(int value, String description, int ladezeit) {
            this.value = value;
            this.description = description;
            this.ladezeit = ladezeit;
        }
        
        public int getValue() {
            return value;
        }
        
        public String getDescription() {
            return description;
        }
        
        public int getLadezeit() {
            return ladezeit;
        }
}
```

### Mit Lombok eqivalent zu:

```java
import lombok.Getter;

@RequiredArgsConstructor
@Getter
private enum ErrorState {
    OK(0, "Ok", 100),
    ERROR(1, "Error", 200),
    UNKNOWN(2, "Unknown", 300);

    private final int value;
    private final String description;
    private final int ladezeit;
}
```

### EnumSet um mehrere EnumStates gleichzeitig zu speichern 

```java
import java.util.EnumSet;

EnumSet<ErrorState> errorStates = EnumSet.of(ErrorState.OK, ErrorState.ERROR);

errorStates.remove(ErrorState.OK);

errorStates.add(ErrorState.UNKNOWN);
```

#### Literatur
- Der Weg zum Java Profi Auflage 5 
- - Kapitel 3.4.4 (S.154)