namespace Project1.PasswordGenerator.Domain;

public static class Messages
{
    public static class Questions
    {
        public static readonly string IncludeNumbers = "Do you want to include numbers? (Y/N)";
        public static readonly string IncludeLowercaseLetters = "Do you want to include lowercase characters? (Y/N)";
        public static readonly string IncludeUppercaseLetters = "Do you want to include uppercase characters? (Y/N)";
        public static readonly string IncludeSpecialChars = "Do you want to include special characters? (Y/N)";
        public static readonly string PasswordLenght = "How long do you want to keep your password lenght?";
    
    }

    public static class Errors
    {
        public static readonly string InvalidInput = "ERROR: Invalid Input!";
        public static readonly string AllNo = "ERROR: You cannot say no to all questions if you want a password!\n";
        public static readonly string NegativeInt = "ERROR: Please type a positive integer!\n";
    }
    
    public static void PrintWelcomeMessage()
    {
        Console.WriteLine("************************************************");
        Console.WriteLine("Welcome to the P A S S W O R D M A N A G E R");
        Console.WriteLine("************************************************");
    }
    
}
