
// Sum of even and odd


import java.util.Scanner;

public class Question_7 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();

        int evenSum = 0;
        int oddSum = 0;

        System.out.println("Enter the numbers: ");
        for (int i = 0; i < n; i++) {
            int num = sc.nextInt();

            if (num % 2 == 0) {
                evenSum = evenSum + num;
            } else {
                oddSum = oddSum + num;
            }
        }

        System.out.println("Sum of Even = " + evenSum);
        System.out.println("Sum of Odd = " + oddSum);

        sc.close();
    }
}


