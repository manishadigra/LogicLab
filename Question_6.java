// palindrome checker

import java.util.Scanner;

public class Question_6 {

    static boolean isPalindrome(String s) {
        s = s.toLowerCase();
        int l = 0;
        int r = s.length() - 1;

        while (l < r) {
        	
            if (s.charAt(l) != s.charAt(r))
                return false;
            l++;
            r--;
        }
        return true;
    }

    public static void main(String[] args) {
    	
    	 Scanner sc = new Scanner(System.in);

         System.out.print("Enter a string: ");
         String str = sc.nextLine();
         
         if (isPalindrome(str)) {
             System.out.println("Palindrome");
         } else {
             System.out.println("Not Palindrome");
         }

    } 
}
