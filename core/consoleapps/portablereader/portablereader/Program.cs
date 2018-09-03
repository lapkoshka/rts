using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace portablereader
{
    class Program
    {
        static void Main(string[] args)
        {
            PortableReader reader = new PortableReader();
            int delay = 2000;
            if (args.Length > 0)
            {
                int.TryParse(args[0], out delay);
            }
            else
            {
                Console.WriteLine("error:missed argument");
            }
            bool isConnected = reader.Connect();
            if (isConnected)
            {
                Console.WriteLine("ok:connected");
                reader.ListenReader(delay);
            }
            else
            {
                Console.WriteLine("error:reader does not found");
            }
        }
    }

}
