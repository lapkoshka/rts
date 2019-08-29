using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

//
namespace MainReaderAdapter
{
    class Program
    {
        static void Main(string[] args)
        {
            Search search = new Search();
            bool isFound = search.Start();
            if (isFound)
            {
                Console.WriteLine("found:" + search.Ip);
                Connect(search.Ip, args);
            }
            else
            {
                Console.WriteLine("error:Reader does not found");
            }
        }

        static void Connect(string ip, string[] args)
        {
            MainReader reader = new MainReader();
            //1 - 15
            byte Qvalue = 4;

            // 0,1,3, 255: auto
            byte Session = 255;

            //20 * 100ms, total 0 - 255
            byte Scantime = 20;

            if (args.Length > 0)
            {
                byte.TryParse(args[0], out Qvalue);
                byte.TryParse(args[1], out Session);
                byte.TryParse(args[2], out Scantime);
            }
            else
            {
                Console.WriteLine("error:missed arguments");
            }

            bool status = reader.Connect(ip);
            if (status)
            {
                Console.WriteLine("ok:connected");
                string input = Console.ReadLine();
                if (input == "start_listen")
                {
                    reader.ListenReader(Qvalue, Session, Scantime);
                }
            }
            else
            {
                Console.WriteLine("error:reader does not connected");
            }
        }
    }
}


