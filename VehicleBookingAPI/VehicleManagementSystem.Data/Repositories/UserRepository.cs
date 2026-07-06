using Dapper;
using VehicleManagementSystem.Core.Models;
using VehicleManagementSystem.Data.DbHelper;
using VehicleManagementSystem.Data.RepositoryInterfaces;

namespace VehicleManagementSystem.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public UserRepository(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.QueryFirstOrDefaultAsync<User>(
                "SP_Login",
                new
                {
                    Email = email
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<int> RegisterAsync(User user)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.ExecuteAsync(
                "SP_RegisterUser",
                new
                {
                    user.Name,
                    user.Email,
                    user.PasswordHash
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}