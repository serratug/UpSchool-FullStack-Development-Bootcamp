namespace Project1.PasswordGenerator.Domain;

public class PasswordGenerator
{
    private List<char> CharPool { get; set; }
    private List<char> Password { get; set; }

    private readonly Random _random;

    
    public PasswordGenerator()
    {
        CharPool = new List<char>();
        Password = new List<char>();
        
        _random = new Random();
    }
    
    public string Generate()
    {
        PrintWelcomeMessage();
        CreateCharPool();
        int charCount = AskForPasswordLength();

        for (int i = 0; i < charCount; i++)
        {
            var randomIndex = _random.Next(CharPool.Count);
            Password.Add(CharPool[randomIndex]);
        }

        return new string(Password.ToArray());
    }
    
    private void CreateCharPool()
    {
        if (AskForNumbers())
        {
            CharPool.AddRange("0123456789");
        }

        if (AskForLowercaseLetters())
        {
            CharPool.AddRange("abcdefghijklmnopqrstuvwxyz");
        }
        
        if (AskForUppercaseLetters())
        {
            CharPool.AddRange("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }
        
        if (AskForSpecialChars())
        {
            CharPool.AddRange("[$&+,:;=?@#|'<>.-^*()%!]");
        }
    }

    private static bool ReadAnswer()
    {
        var answer = Console.ReadLine();
        
        switch (answer)
        {
            case "Y":
            case "y":
                return true;
            case "N":
            case "n":
                return false;
            default:
                Console.WriteLine("Invalid Input! Try again.");
                return ReadAnswer();
        }
    }

    private static bool AskForNumbers()
    {
        Console.WriteLine("Do you want to include numbers? (Y/N)");
        return ReadAnswer();
    }

    private static bool AskForLowercaseLetters()
    {
        Console.WriteLine("Do you want to include lowercase characters? (Y/N)");
        return ReadAnswer();
    }
    
    private static bool AskForUppercaseLetters()
    {
        Console.WriteLine("Do you want to include uppercase characters? (Y/N)");
        return ReadAnswer();
    }
    
    private static bool AskForSpecialChars()
    {
        Console.WriteLine("Do you want to include special characters? (Y/N)");
        return ReadAnswer();
    }
    
    private static int AskForPasswordLength()
    {
        Console.WriteLine("How long do you want to keep your password lenght?");
        var answer = Console.ReadLine();
        return Convert.ToInt32(answer);
    }

    private static void PrintWelcomeMessage()
    {
        Console.WriteLine("************************************************");
        Console.WriteLine("Welcome to the P A S S W O R D M A N A G E R");
        Console.WriteLine("************************************************");
    }
    

}
