import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FileWritingExample {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter text:");

        String text = sc.nextLine();

        try {

            FileWriter writer = new FileWriter("output.txt");

            writer.write(text);

            writer.close();

            System.out.println("Data written to file");

        } catch (IOException e) {

            System.out.println("File writing error");

        }

        sc.close();

    }

}