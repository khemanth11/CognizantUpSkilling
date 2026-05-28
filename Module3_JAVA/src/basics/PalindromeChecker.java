import java.util.Scanner;

public class PalindromeChecker {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a string:");

        String text = sc.nextLine();

        text = text.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();

        String reversed = new StringBuilder(text).reverse().toString();

        if (text.equals(reversed)) {

            System.out.println("Palindrome");

        } else {

            System.out.println("Not Palindrome");

        }

        sc.close();

    }

}