import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        HashMap<Integer, String> students = new HashMap<>();

        System.out.println("How many students?");

        int count = sc.nextInt();

        sc.nextLine();

        for (int i = 0; i < count; i++) {

            System.out.println("Enter student ID:");

            int id = sc.nextInt();

            sc.nextLine();

            System.out.println("Enter student name:");

            String name = sc.nextLine();

            students.put(id, name);

        }

        System.out.println("Enter ID to search:");

        int searchId = sc.nextInt();

        System.out.println("Student Name: " + students.get(searchId));

        sc.close();

    }

}