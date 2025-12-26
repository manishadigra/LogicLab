import java.util.Scanner;

public class Question_3 {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("enter the integer");
        int num = sc.nextInt();

        boolean Prime = true;

        if (num <= 1) {
            Prime = false;
        } else {
            for (int i = 2; i < num; i++) {
                if (num % i == 0) {
                    Prime = false;
                    break;
                }
            }
        }

        if (Prime) {
            System.out.println(num + " is prime integer");
        } else {
            System.out.println(num + " is not prime integer");
        }

       
    }
}
