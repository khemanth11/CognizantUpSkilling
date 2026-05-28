import java.util.Scanner;

public class TryCatchExample {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        try {

            System.out.println("Enter first number:");

            int a = sc.nextInt();

            System.out.println("Enter second number:");

            int b = sc.nextInt();

            int result = a / b;

            System.out.println("Result: " + result);

        } catch (ArithmeticException e) {

            System.out.println("Cannot divide by zero");

        }

        sc.close();

    }

}