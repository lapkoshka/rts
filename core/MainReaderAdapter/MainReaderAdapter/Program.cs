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
            ReaderConnectingParams parameters = parseArgsAsParams(args);

            if (parameters.isIpUnknown())
            {
                Search search = new Search();
                bool isFound = search.Start();
                if (isFound)
                {
                    parameters.ip = search.Ip;
                    Console.WriteLine("found:" + parameters.ip);
                }
                else
                {
                    Console.WriteLine("error:Reader does not found");
                    return;
                }
            }

            Connect(parameters);
        }

        static void Connect(ReaderConnectingParams parameters)
        {
            MainReader reader = new MainReader();


            ErrorCode response = reader.Connect(parameters.ip);
            if (response == ErrorCode.Success)
            {
                Console.WriteLine("ok:connected");
                string input = Console.ReadLine();
                if (input == "start_listen")
                {
                    reader.ListenReader(parameters.qvalue, parameters.session, parameters.scantime);
                }

                return;
            }
            Console.WriteLine("error:" + response);
        }

        static ReaderConnectingParams parseArgsAsParams(string[] args)
        {
            byte qvalue = 4;
            byte session = 255;
            byte scantime = 20;
            string ip = "";

            if (args.Length > 0)
            {
                byte.TryParse(args[0], out qvalue);
                byte.TryParse(args[1], out session);
                byte.TryParse(args[2], out scantime);
                ip = args[3];
            }
            else
            {
                Console.WriteLine("error:missed arguments");
            }

            return new ReaderConnectingParams(qvalue, session, scantime, ip);
        }
    }

    public class ReaderConnectingParams
    {
        public byte qvalue;
        public byte session;
        public byte scantime;
        public string ip;

        public ReaderConnectingParams(byte Qvalue, byte Session, byte Scantime, string Ip)
        {
            qvalue = Qvalue;
            session = Session;
            scantime = Scantime;
            ip = Ip;
        }

        public bool isIpUnknown()
        {
            return ip == "0.0.0.0" || ip == "";
        }
    }
}


