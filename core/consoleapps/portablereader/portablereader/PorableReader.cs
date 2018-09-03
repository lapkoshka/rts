using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace portablereader
{
    public class PortableReader
    {
        private byte _comAdr = 255;
        private int _comPortIndex = 0;
        private readonly int _defaultThreadSleepTime = 5;

        public bool Connect()
        {
            int port = 0;
            //Как мне использовать говорящие значения из енама?
            byte BaudRate = 5;//(byte)BaudRate.BPS_57600
            int OpenResult = ReaderB.StaticClassReaderB.AutoOpenComPort(ref port, ref _comAdr, BaudRate, ref _comPortIndex);
            return OpenResult == 0;
            //fCmdRet = StaticClassReaderB.GetReaderInformation(ref fComAdr, VersionInfo, ref ReaderType, TrType, ref dmaxfre, ref dminfre, ref powerdBm, ref ScanTime, frmcomportindex);
        }


        // public void PingReader()
        // {
        //     byte ConAddr;
        //     byte[] VersionInfo;
        //     Task.Factory.StartNew(() =>
        //     {
        //         while (true)
        //         {
        //             int fCmdRet = ReaderB.StaticClassReaderB.GetReaderInformation(ref byte ConAddr, byte[] VersionInfo, ref byte ReaderType, byte[] TrType, ref byte dmaxfre, ref byte dminfre, ref byte powerdBm, ref byte ScanTime, ref _comPortIndex);

        //         Thread.Sleep(5000);
        //         }
        //     }).Wait();

        // }
        public void ListenReader(int delay)
        {
            Task.Factory.StartNew(() =>
            {
                while (true)
                {
                    int sleepTime = _defaultThreadSleepTime;
                    byte AdrTID = 0;
                    byte LenTID = 0;
                    byte TIDFlag = 0;
                    byte[] EPC = new byte[5000];
                    int TotalLen = 0;
                    int CardNum = 0;
                    int InventoryResponse = ReaderB.StaticClassReaderB.Inventory_G2(ref _comAdr, AdrTID, LenTID, TIDFlag, EPC, ref TotalLen, ref CardNum, _comPortIndex);
                    if (InventoryResponse == 1)
                    {
                        RFIDTag tag = BuildEPCTagFromBytes(TotalLen, EPC);
                        Console.WriteLine("tag:"+tag.UID);
                        sleepTime = delay;
                    }
                    Thread.Sleep(sleepTime);
                }
            }).Wait();
        }

        private RFIDTag BuildEPCTagFromBytes(int TotalLen, byte[] EPC)
        {
            byte[] daw = new byte[TotalLen];
            Array.Copy(EPC, daw, TotalLen);
            string sEPC = daw.ToHexString().Substring(0 * 2 + 2, daw[0] * 2);
            return new RFIDTag() { UID = sEPC };
        }
    }

    public static class Extensions
    {
        public static string ToHexString(this byte[] source)
        {
            StringBuilder sb = new StringBuilder(source.Length * 3);
            foreach (byte b in source)
            {
                sb.Append(Convert.ToString(b, 16).PadLeft(2, '0'));
            }

            return sb.ToString().ToUpper();
        }
    }

    public struct RFIDTag
    {
        public byte PacketParam;
        public byte LEN;
        public string UID;
        public byte RSSI;
        public byte ANT;
        public Int32 Handles;

    }
}
