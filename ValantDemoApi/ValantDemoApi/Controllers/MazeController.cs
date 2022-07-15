using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;

namespace ValantDemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MazeController : ControllerBase
    {
        private readonly ILogger<MazeController> _logger;
        private readonly IMemoryCache _memoryCache;
        private readonly string MAZE_KEY = "Maze_Key";

        public MazeController(ILogger<MazeController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _memoryCache = memoryCache;
        }
        

        [HttpGet("/Moves")]
        public IEnumerable<string> GetNextAvailableMoves()
        {
          return new List<string> {"Up", "Down", "Left", "Right"};
        }

        [HttpGet("/Maze")]
        public IEnumerable<IEnumerable<string>> GetCurrentMaze()
        {
          IEnumerable<IEnumerable<string>> result;
          if (!this._memoryCache.TryGetValue(MAZE_KEY, out result)) {
            this._memoryCache.Set(MAZE_KEY, getDefaultList());
            return (IEnumerable<IEnumerable<string>>)this._memoryCache.Get(MAZE_KEY);
          }
          
          return result;
        }

        [HttpPost("/Maze")]
        public IEnumerable<IEnumerable<string>> UpdateCurrentMaze(IEnumerable<IEnumerable<string>> maze)
        {
          this._memoryCache.Set(MAZE_KEY, maze);
          return (IEnumerable<IEnumerable<string>>)this._memoryCache.Get(MAZE_KEY);
        }

        protected IEnumerable<IEnumerable<string>> getDefaultList()
        {
          List<List<string>> maze = new List<List<string>>();
        
          maze.Add(new List<string> {"S", "O", "O", "X", "O", "X"});
          maze.Add(new List<string> {"X", "X", "O", "X", "X", "X"});
          maze.Add(new List<string> {"O", "O", "O", "X", "X", "X"});
          maze.Add(new List<string> {"X", "O", "X", "X", "X", "X"});
          maze.Add(new List<string> {"O", "O", "O", "O", "O", "O"});
          maze.Add(new List<string> {"X", "X", "O", "X", "O", "E"});

          return maze;
        }
    }
}
