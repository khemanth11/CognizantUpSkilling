import java.util.Scanner;

public class StringReversal {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a string:");

        String text = sc.nextLine();

        String reversed = "";

        for (int i = text.length() - 1; i >= 0; i--) {

            reversed += text.charAt(i);

        }

        System.out.println("Reversed String: " + reversed);

        sc.close();

    }

}