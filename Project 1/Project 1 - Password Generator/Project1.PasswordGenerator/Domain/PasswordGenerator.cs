using System.Reflection.Metadata.Ecma335;

namespace Project1.PasswordGenerator.Domain;

public class PasswordGenerator
{
    private List<char> CharPool { get; }
    private List<char> Password { get; }

    private readonly Random _random;

    
    public PasswordGenerator()
    {
        CharPool = new List<char>();
        Password = new List<char>();
        
        _random = new Random();
    }
    
    public string Generate()
    {
        Messages.PrintWelcomeMessage();
        CreateCharPool(); // By asking necessary questions to the user
        int charCount = AskForPasswordLength(message:null);

        for (int i = 0; i < charCount; i++)
        {
            var randomIndex = _random.Next(CharPool.Count);
            Password.Add(CharPool[randomIndex]);
        }

        return new string(Password.ToArray());
    }
    
    private void CreateCharPool()
    {
        var yesCheck = 0;
        
        if (ReadAnswer(Messages.Questions.IncludeNumbers))
        {
            CharPool.AddRange(CharTypes.Numbers);
            yesCheck++;
        }

        if (ReadAnswer(Messages.Questions.IncludeLowercaseLetters))
        {
            CharPool.AddRange(CharTypes.LowercaseLetters);
            yesCheck++;
        }
        
        if (ReadAnswer(Messages.Questions.IncludeUppercaseLetters))
        {
            CharPool.AddRange(CharTypes.UppercaseLetters);
            yesCheck++;
        }
        
        if (ReadAnswer(Messages.Questions.IncludeSpecialChars))
        {
            CharPool.AddRange(CharTypes.SpecialChars);
            yesCheck++;
        }

        // Check if not answered as 'yes' at least once
        if (yesCheck == 0)
        {
            Console.WriteLine(Messages.Errors.AllNo);
            CreateCharPool();
        }

    }

    private static bool ReadAnswer(string question)
    {
        Console.WriteLine(question);
        
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
                Console.WriteLine(Messages.Errors.InvalidInput);
                return ReadAnswer(question);
        }
    }

    private static int AskForPasswordLength(string? message)
    {
        // If the method called with an error message
        if (message != null) Console.WriteLine(message);
        
        Console.WriteLine(Messages.Questions.PasswordLenght);
        var answer = Console.ReadLine();
        
        // Check if user typed an integer
        if (!int.TryParse(answer, out var length))
            return AskForPasswordLength(Messages.Errors.InvalidInput);
        
        // Check if user typed a positive integer
        if (length < 1) return AskForPasswordLength(Messages.Errors.NegativeInt);
        
        return length;
    }
    
}
