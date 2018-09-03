using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Net;

namespace MainReaderAdapter
{
    class Search
    {
        public string Ip;
        public bool Start()
        {
            uint broadcastIp = 0xffffffff;
            int timeout = 1500;

            DevControl.tagErrorCode InitErrorCode = DevControl.DM_Init(new SearchCallBack(SearchHandler), IntPtr.Zero);
            DevControl.tagErrorCode SearchErrorCode = DevControl.DM_SearchDevice(broadcastIp, timeout);
            return SearchErrorCode == DevControl.tagErrorCode.DM_ERR_OK ? true : false;
        }

        private void SearchHandler(IntPtr Dev, IntPtr Data)
        {
            uint ip = 0;
            StringBuilder DevName = new StringBuilder(100);
            StringBuilder MacAdd = new StringBuilder(100);
            DevControl.tagErrorCode eCode = DevControl.DM_GetDeviceInfo(Dev, ref ip, MacAdd, DevName);
            Ip = IPAddress.Parse(ip.ToString()).ToString();
        }
    }

    internal delegate void SearchCallBack(IntPtr dev, IntPtr data);

    public class DevControl
    {
        private const string DLL_NAME = "dmdll.dll";

        public enum tagErrorCode
        {
            DM_ERR_OK,				/* no error */
            DM_ERR_PARA,			/* parameter error */
            DM_ERR_NOAUTH,			/* */
            DM_ERR_AUTHFAIL,		/* auth fail */
            DM_ERR_SOCKET,			/* socket error */
            DM_ERR_MEM,				/* */
            DM_ERR_TIMEOUT,
            DM_ERR_ARG,
            DM_ERR_MATCH,			/* parameters in command and reply are not match */
            DM_ERR_OPR,
            DM_ERR_MAX
        };

        internal enum DataType
        {
            PARA_TYPE_STRING,
            PARA_TYPE_UCHAR,
            PARA_TYPE_USHORT,
            PARA_TYPE_ULONG,
            PARA_TYPE_UCHAR_HEX,
            PARA_TYPE_INVALID
        };


        [DllImport(DLL_NAME, CallingConvention = CallingConvention.StdCall)]
        internal static extern tagErrorCode DM_Init(SearchCallBack searchCB, IntPtr data);

        [DllImport(DLL_NAME, CallingConvention = CallingConvention.StdCall)]
        internal static extern tagErrorCode DM_SearchDevice(uint deviceIP, int timeout);

        [DllImport(DLL_NAME, CallingConvention = CallingConvention.StdCall)]
        internal static extern tagErrorCode DM_GetDeviceInfo(IntPtr devhandle, ref uint ipaddr, StringBuilder macaddr, StringBuilder devname);
    }
}
