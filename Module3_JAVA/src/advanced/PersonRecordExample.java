import java.util.List;

record Person(String name, int age) {}

public class PersonRecordExample {

    public static void main(String[] args) {

        List<Person> people = List.of(
                new Person("Alice", 22),
                new Person("Bob", 17),
                new Person("Charlie", 30)
        );

        people.stream()
                .filter(person -> person.age() >= 18)
                .forEach(System.out::println);

    }

}