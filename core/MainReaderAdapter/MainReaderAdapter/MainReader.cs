using System;

using System.Threading.Tasks;
using UHF;
using System.ComponentModel;
using System.Threading;
using System.Runtime.InteropServices;
using System.Diagnostics;


namespace MainReaderAdapter
{

    public class MainReader
    {
        private static RFIDCallBack delegateRFIDCallBack;
        public bool Connect(string ipAddress)
        {
            int nPort = 27011;
            byte fComAdr = 255;
            int frmPortIndex = 0;
            var fCmdRet = (ErrorCode)RWDev.OpenNetPort(nPort, ipAddress, ref fComAdr, ref frmPortIndex);
            if (fCmdRet == ErrorCode.Success)
            {
                delegateRFIDCallBack = new RFIDCallBack(RFIDTagCallback);
                RWDev.InitRFIDCallBack(delegateRFIDCallBack, true, frmPortIndex);
                return true;
            }
            else
            {
                //Console.Write(fCmdRet.GetDescription());
                return false;
            }
        }
        
        protected virtual void RFIDTagCallback(IntPtr p, Int32 nEvt)
        {
            RFIDTag rfidTag = (RFIDTag)Marshal.PtrToStructure(p, typeof(RFIDTag));
            Console.WriteLine("tag:"+rfidTag.UID + ":"+ rfidTag.RSSI);
        }

        public void ListenReader(byte Qvalue, byte Session, byte Scantime)
        {
            Task.Factory.StartNew(() =>
            {
                while (true)
                {
                    byte _Qvalue = Qvalue;
                    byte _Session = Session;
                    byte _Scantime = Scantime;


                    byte fComAdr = 0;
                    byte MaskMem = 0;
                    byte[] MaskAdr = new byte[2];
                    byte MaskLen = 0;
                    byte[] MaskData = new byte[100];
                    byte MaskFlag = 0;
                    byte AdrTID = 0;
                    byte LenTID = 6;
                    byte TIDFlag = 0;
                    byte Target = 0;
                    byte InAnt = 0x80;
                    byte FastFlag = 0;
                    byte[] EPC = new byte[50000];
                    byte Ant = 0;
                    int Totallen = 0;
                    int TagNum = 0;

                    int frmcomportindex = 1;
                    int fCmdRet = RWDev.Inventory_G2(
                        ref fComAdr,
                        _Qvalue,
                        _Session,
                        MaskMem,
                        MaskAdr,
                        MaskLen,
                        MaskData,
                        MaskFlag,
                        AdrTID,
                        LenTID,
                        TIDFlag,
                        Target,
                        InAnt,
                        _Scantime,
                        FastFlag,
                        EPC,
                        ref Ant,
                        ref Totallen,
                        ref TagNum,
                        frmcomportindex
                    );
                    Thread.Sleep(5);
                }
            }).Wait();
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

    public enum ErrorCode : uint
    {
        [Description("Success")]
        Success = 0x0,

        [Description("Return before Inventory finished")]
        InventoryFinished = 0x1,

        [Description("The Inventory-scan-time overflow")]
        InventoryScanOverflow = 0x2,

        [Description("More data")]
        MoreData = 0x3,

        [Description("Reader module MCU is Full")]
        ReaderModuleIsFull = 0x4,

        [Description("Access Password Error")]
        AccessPasswordError = 0x5,

        [Description("Destroy Password Error")]
        DestroyPasswordError = 0x09,

        [Description("Destroy Password Error Cannot be Zero")]
        DestroyPasswordErrorZero = 0x0a,

        [Description("Tag Not Support the command")]
        TagNotSupportCommand = 0x0b,

        [Description("Use the commmand, Access Password Cannot be Zero")]
        AccessPasswordZero = 0x0c,

        [Description("Tag is protected,cannot set it again")]
        TagIsProtected = 0x0d,

        [Description("Tag is unprotected,no need to reset it")]
        TagIsUnprotected = 0x0e,

        [Description("There is some locked bytes, write fail")]
        LockedBytes = 0x10,

        [Description("Can not lock it")]
        CanNotLock = 0x11,

        [Description("Is locked, cannot lock it again")]
        Locked = 0x12,

        [Description("Parameter save fail, сan use before power")]
        ParametrSaveFail = 0x13,

        [Description("Cannot adjust")]
        CannotAdjust = 0x14,

        [Description("Tag custom function error")]
        TagCustomFuctionError = 0x1A,

        [Description("Check antenna error")]
        AntenaError = 0xF8,

        [Description("Command execute error")]
        CommandExecuteError = 0xF9,

        [Description("Get Tag, Poor Communication, Inoperable")]
        PoorCommunication = 0xFA,

        [Description("No Tag Operable")]
        NoTagOperable = 0xFB,

        [Description("Tag Return ErrorCode")]
        TagReturnError = 0xFC,

        [Description("Command length wrong")]
        CommandLengthWrong = 0xFD,

        [Description("Illegal command")]
        IllegalComand = 0xFE,

        [Description("Parameter Error")]
        ParametrError = 0xFF,

        [Description("Communication error")]
        CommunicationError = 0x30,

        [Description("CRC checksummat error")]
        CrcError = 0x31,

        [Description("Return data length error")]
        DataLengthError = 0x32,

        [Description("Communication busy")]
        CommunicationBusy = 0x33,

        [Description("Busy, command is being executed")]
        CommandExecuted = 0x34,

        [Description("ComPort Opened")]
        ComPortOpened = 0x35,

        [Description("ComPort Closed")]
        ComPortClosed = 0x36,

        [Description("Invalid Handle")]
        InvalidHandle = 0x37,

        [Description("Invalid Port")]
        InvalidPort = 0x38,

        [Description("Return Command Error")]
        ReturnCommandError = 0xEE,
    }
}
