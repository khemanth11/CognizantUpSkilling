public class TypeCastingExample {

    public static void main(String[] args) {

        double doubleValue = 99.99;

        int intValue = (int) doubleValue;

        System.out.println("Double to Int: " + intValue);

        int number = 50;

        double convertedDouble = (double) number;

        System.out.println("Int to Double: " + convertedDouble);

    }

}