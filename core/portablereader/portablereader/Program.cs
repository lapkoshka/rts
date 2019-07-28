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
                Console.WriteLine("error:Missed argument");
            }
            bool isConnected = reader.Connect();
            if (isConnected)
            {
                Console.WriteLine("ok:connected");
                string input = Console.ReadLine();
                if (input == "start_listen")
                {
                    reader.ListenReader(delay);
                }
            }
            else
            {
                Console.WriteLine("error:Reader does not found");
            }
        }
    }

}
