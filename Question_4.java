// reverse words

import java.util.Scanner;

public class Question_4 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the string");
        String str = sc.nextLine();

        String[] words = str.split(" ");

        for (String w : words) {
            String rev = "";
            for (int i = w.length() - 1; i >= 0; i--)
                rev += w.charAt(i);
            System.out.print(rev + " ");
        }
    }
}

