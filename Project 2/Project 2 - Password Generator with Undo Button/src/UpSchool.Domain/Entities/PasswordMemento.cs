namespace UpSchool.Domain.Entities;

public class PasswordMemento
{
    private string State;
    
    public PasswordMemento(string state)
    {
        this.State = state;
    }

    public string GetState()
    {
        return State;
    }
}