﻿using SWD392_Project.Models;

namespace SWD392_Project.Repository;

public interface IRoleRepository
{
    IEnumerable<Role> GetAllRole();
}