using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class DatabaseContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=CarSystem;Trusted_Connection=true");
            //optionsBuilder.UseSqlServer(@"Server=LAPTOP-GR0LVOCR;Database=CarSystem;Trusted_Connection=true");
            //optionsBuilder.UseSqlServer(@"workstation id=CarSystem.mssql.somee.com;packet size=4096;user id=divyeshkanpariya_SQLLogin_1;pwd=nok1mjln2l;data source=CarSystem.mssql.somee.com;persist security info=False;initial catalog=CarSystem;TrustServerCertificate=True");
            optionsBuilder.UseSqlServer(@"Server=sql.bsite.net\MSSQL2016;Database=carrent_;User Id=carrent_;password=Divyesh@3747;TrustServerCertificate=True");
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<CarImage> CarImages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
        public DbSet<CreditCard> CreditCards { get; set; }

    }
}
