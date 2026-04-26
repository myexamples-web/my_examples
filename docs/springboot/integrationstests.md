# Integrationstests

## Snapshot Tests (Skuzzle)

Diese Art von Tests schießen eine Anfrage an die API und erstellen von der Response einen Snapshot in späteren verlauf wird dann nurnoch geprüft ob die API wieder die gleiche Response zurückgibt  

<details>
<summary>POM</summary>

```xml
<dependencyManagment>
    <dependency>
        <groupId>de.skuzzle.test</groupId>
        <artifactId>snapshot-tests-bom</artifactId>
        <version>${snapshot-tests-bom.version}</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencyManagment>

<dependencies>
    <dependency>
        <groupId>de.skuzzle.test</groupId>
        <artifactId>snapshot-tests-junit5</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>de.skuzzle.test</groupId>
        <artifactId>snapshot-tests-directory-params</artifactId>
        <scope>test</scope>
    </dependency>
    
    <dependency>
        <groupId>de.skuzzle.test</groupId>
        <artifactId>snapshot-tests-json</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```
</details>

<details>
<summary>Code</summary>

```java
@SpringBootTest
@AutoConfigureMockMvc
@EnableSnapshotTests
@SnapshotDirectory("snapshot/response")  
class IntegrationsTest {

    @Autowired
    private MockMvc mockMvc;
    
    //@ForceUpdate // Nur verwenden wenn man die Testfälle ändert  
    @ParameterizedTest
    @FilesFrom(testRessourcesDirectory = "snapshot/request", extension = "json")
    void getUserById_shouldMatchSnapshot(Testfile testfile, Snapshot snapshot) throws Exception {  // (2) Snapshot als Parameter
        assertDoesNotThrow(()->{
            String response = mockMvc.perform(get("/api/beispiel")
                    .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsString();       
        });
        
        snapshot.named(testfile.name())
                .assertThat(responseBody)
                .as(json)
                .matchesSnapshotStructure();
    }
}
```

</details>

<details>
<summary>Erklärung</summary>

### AutoConfigureMockMvc

    @AutoConfigureMockMvc

Konfiguriert automatisch eine MockMvc die dann injiziert werden kann mit folgenden sachen injiziert 
- Security injection
- Controller injection
- Exception Handling injection


### SnapshotDirectory

    @SnapshotDirectory("snapshot/response")

Der Ordner in dennen die Snapshots gespeichert werden 

<strong style="color: red">Wichtig: </strong> der Pfad beginnt aus dem ressources Ordner

### FilesFrom

    @FilesFrom(testRessourcesDirectory = "snapshot/request", extension = "json")

Der Ordner in den die Testfälle als JSON enthalten sind 

<strong style="color: red">Wichtig: </strong> der Pfad beginnt aus dem ressources Ordner

</details>

