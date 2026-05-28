import java.util.Scanner;

public class Calculator {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter first number:");
        double num1 = sc.nextDouble();

        System.out.println("Enter second number:");
        double num2 = sc.nextDouble();

        System.out.println("Choose operation (+, -, *, /):");
        char operator = sc.next().charAt(0);

        double result;

        switch (operator) {

            case '+':
                result = num1 + num2;
                System.out.println("Result: " + result);
                break;

            case '-':
                result = num1 - num2;
                System.out.println("Result: " + result);
                break;

            case '*':
                result = num1 * num2;
                System.out.println("Result: " + result);
                break;

            case '/':
                result = num1 / num2;
                System.out.println("Result: " + result);
                break;

            default:
                System.out.println("Invalid Operator");

        }

        sc.close();

    }

}