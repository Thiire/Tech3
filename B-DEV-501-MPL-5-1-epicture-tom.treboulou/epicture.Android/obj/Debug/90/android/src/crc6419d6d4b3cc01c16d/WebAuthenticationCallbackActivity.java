package crc6419d6d4b3cc01c16d;


public class WebAuthenticationCallbackActivity
	extends crc64a0e0a82d0db9a07d.WebAuthenticatorCallbackActivity
	implements
		mono.android.IGCUserPeer
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"";
		mono.android.Runtime.register ("WebAuthenticationCallbackActivity, epicture.Android", WebAuthenticationCallbackActivity.class, __md_methods);
	}


	public WebAuthenticationCallbackActivity ()
	{
		super ();
		if (getClass () == WebAuthenticationCallbackActivity.class)
			mono.android.TypeManager.Activate ("WebAuthenticationCallbackActivity, epicture.Android", "", this, new java.lang.Object[] {  });
	}

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
