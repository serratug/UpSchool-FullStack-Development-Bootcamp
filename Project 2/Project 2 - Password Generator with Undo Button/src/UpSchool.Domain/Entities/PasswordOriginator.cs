namespace UpSchool.Domain.Entities;

public class PasswordOriginator
{
    public string State;

    public void SetState(string state)
    {
        this.State = state;
    }

    public PasswordMemento SaveState()
    {
        return new PasswordMemento(State);
    }

    public void GetState(PasswordMemento passwordMemento)
    {
        State = passwordMemento.GetState();
    }
}