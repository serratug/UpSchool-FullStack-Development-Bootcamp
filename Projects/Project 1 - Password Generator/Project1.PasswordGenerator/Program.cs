using Project1.PasswordGenerator.Domain;

var passwordGenerator = new PasswordGenerator();

Console.WriteLine($"Your password: {passwordGenerator.Generate()}");

Console.ReadLine();