using VehicleManagementSystem.Core.Models;

namespace VehicleManagementSystem.Data.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);

        Task<int> RegisterAsync(User user);
    }
}