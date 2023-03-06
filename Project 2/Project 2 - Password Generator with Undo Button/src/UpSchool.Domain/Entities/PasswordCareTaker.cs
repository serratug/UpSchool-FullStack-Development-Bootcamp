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
        
        if (GetStateCount() > 1)
            passwordMementoList.Remove(lastState);

        return lastState;
    }

    public int GetStateCount()
    {
        return passwordMementoList.Count;
    }

    public List<PasswordMemento> GetList()
    {
        return passwordMementoList;
    }
}