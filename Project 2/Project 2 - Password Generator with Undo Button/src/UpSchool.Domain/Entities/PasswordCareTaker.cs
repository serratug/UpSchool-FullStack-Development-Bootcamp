namespace UpSchool.Domain.Entities;

public class PasswordCareTaker
{
    private List<PasswordMemento> passwordMementoList = new List<PasswordMemento>();

    public void Push(PasswordMemento state)
    {
        passwordMementoList.Add(state);
    }

    public PasswordMemento Pop()
    {
        PasswordMemento lastState = passwordMementoList.Last();
        passwordMementoList.Remove(lastState);
        
        return lastState;
    }

    public int GetStateCount() 
    {
        return passwordMementoList.Count;
    }
}