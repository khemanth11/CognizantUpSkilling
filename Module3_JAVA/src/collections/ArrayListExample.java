import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListExample {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        ArrayList<String> students = new ArrayList<>();

        System.out.println("How many students?");

        int count = sc.nextInt();

        sc.nextLine();

        for (int i = 0; i < count; i++) {

            System.out.println("Enter student name:");

            String name = sc.nextLine();

            students.add(name);

        }

        System.out.println("Student List:");

        for (String student : students) {

            System.out.println(student);

        }

        sc.close();

    }

}