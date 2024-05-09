using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal : EfEntityRepositoryBase<Car, DatabaseContext>, ICarDal
    {
        public List<CarDetailDto> GetCarDetails(Expression<Func<Car, bool>> filter = null)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var result = from c in filter == null ? context.Cars : context.Cars.Where(filter)
                             join b in context.Brands on c.BrandId equals b.BrandId
                             join clr in context.Colors on c.ColorId equals clr.ColorId
                             select new CarDetailDto
                             {
                                 CarId = c.CarId,
                                 CarName = c.CarName,
                                 BrandName = b.BrandName,
                                 ColorName = clr.ColorName,
                                 DailyPrice = c.DailyPrice,
                                 ModelYear = c.ModelYear,
                                 Description = c.Description,
                                 MinFindeksScore = c.MinFindeksScore,
                                 ImagePaths = (from img in context.CarImages
                                               where img.CarId == c.CarId
                                               select new CarImage
                                               {
                                                   CarImageId = img.CarImageId,
                                                   CarId = img.CarId,
                                                   ImagePath = img.ImagePath,
                                                   ImageDate = img.ImageDate
                                               }).ToList()
            };
            var CarList = new List<CarDetailDto>();
            foreach(var car in result)
            {
                    CarDetailDto newCar = new CarDetailDto();
                    newCar = car;
                if (car.ImagePaths != null && car.ImagePaths.Count > 0)
                {
                    if (System.IO.File.Exists(car.ImagePaths.FirstOrDefault().ImagePath))
                    {

                        byte[] zipBytes = System.IO.File.ReadAllBytes(car.ImagePaths.FirstOrDefault().ImagePath);
                        newCar.ImageBytes = zipBytes;
                    }
                }
                CarList.Add(newCar);
                
            }
                
            return CarList;
            }
        }
    }
}
