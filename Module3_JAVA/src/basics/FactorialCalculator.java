import java.util.Scanner;

public class FactorialCalculator {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a number:");

        int number = sc.nextInt();

        long factorial = 1;

        for (int i = 1; i <= number; i++) {

            factorial = factorial * i;

        }

        System.out.println("Factorial: " + factorial);

        sc.close();

    }

}