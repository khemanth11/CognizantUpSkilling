import java.util.Scanner;

class InvalidAgeException extends Exception {

    public InvalidAgeException(String message) {

        super(message);

    }

}

public class AgeValidator {

    static void validateAge(int age) throws InvalidAgeException {

        if (age < 18) {

            throw new InvalidAgeException("Age must be 18 or above");

        }

        System.out.println("Access Granted");

    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter age:");

        int age = sc.nextInt();

        try {

            validateAge(age);

        } catch (InvalidAgeException e) {

            System.out.println(e.getMessage());

        }

        sc.close();

    }

}