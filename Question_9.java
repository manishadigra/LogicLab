
// Factorial using Recursion
import java.util.Scanner;

public class Question_9 {
    static long fact(long n) {
        if (n == 0)
            return 1;
        return n * fact(n - 1);
    }

    public static void main(String[] args) {
    	
        Scanner sc = new Scanner(System.in);
        System.out.println("enter the value of n: ");
        long n = sc.nextInt();
        
        
        System.out.println(fact(n));
    }
}

