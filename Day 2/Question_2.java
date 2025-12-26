
//Student Grade
import java.util.Scanner;

public class Question_2 {
	public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
       
        int sum = 0;
        System.out.print("enter the marks: ");

        for (int i = 1; i <= 5; i++)
            sum += sc.nextInt();

        double percentage = sum / 5.0;
        System.out.println("Percentage = " + percentage);

        if (percentage >= 90) System.out.println("Grade = A");
        else if (percentage >= 75) System.out.println("Grade = B");
        else if (percentage >= 60) System.out.println("Grade = C");
        else if (percentage >= 40) System.out.println("Grade = D");
        else System.out.println("Grade = F");
    }
}
	
	


