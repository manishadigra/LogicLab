
//ATM simulation


import java.util.Scanner;

public class Question_last {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int balance = 1000;
       
        while (true) {
            System.out.println("Enter choice: 1.Check Balance 2.Deposit 3.Withdraw 4.Exit");
            int choice = sc.nextInt();
            
            

            if (choice == 1)                                    // balance
                System.out.println("Balance = " + balance);
            else if (choice == 2) {                             // deposit
            	System.out.print("Enter amount: ");
                int amt = sc.nextInt();
                balance = balance + amt;
                System.out.println("New Balance: " + balance);	
            }
            else if (choice == 3) {                             // withdraw
                System.out.print("Enter amount: ");
                int amt = sc.nextInt();

                if (amt <= balance) {
                    balance = balance - amt;
                    System.out.println("New Balance: " + balance);
                } else {
                    System.out.println("Insufficient Balance");
                }
            }
            else if (choice == 4) {
                System.out.println("Exit");
                break;
            }
            else {
                System.out.println("Invalid choice");
            }
        }
            
    }
}
