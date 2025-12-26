

import java.util.Scanner;

public class Question_1 {

    public static void main(String[] args) {
    	
        // TODO Auto-generated method stub
    	
        Scanner sc = new Scanner(System.in);

        System.out.println("enter the string");
        String str = sc.nextLine();

        String rev = ""; // empty string

        // reversing the string
        for (int i = str.length() - 1; i >= 0; i--) {
            rev += str.charAt(i);
        }

        System.out.println("reversed string : " + rev);
    }
}

