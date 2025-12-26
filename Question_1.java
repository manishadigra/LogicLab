
// Temperature Converter
import java.util.Scanner;

public class Question_1{
    public static void main(String[] args) {

       Scanner sc = new Scanner(System.in);
       
       System.out.println("enter the choice Ctof/Ftoc");
       String choice = sc.next();
       
       System.out.println("enter the value");
       Float value = sc.nextFloat();
       

       
       if(choice.equalsIgnoreCase("Ctof")) {
    	   Float f = (value * 9/5) +32;
    	   System.out.println("Fahernit : "+ f);
       }else if(choice.equalsIgnoreCase("Ftoc")) {
    	   Float c= (value - 32)* 5/9;
    	   System.out.println("Celsius : "+ c);
       }else {
    	   System.out.println("invalid choice");
       }
       
       
       
     
    }
}

