namespace UpStorageChat.Dtos
{
    public static class UserStore
    {
        private static readonly List<ConnectedUserDto> _users = new List<ConnectedUserDto>();

        public static IReadOnlyList<ConnectedUserDto> Users => _users.AsReadOnly();

        public static void AddUser(ConnectedUserDto user)
        {
            _users.Add(user);
        }
    }
}
