import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;
import java.util.Set;
import javax.swing.*;

public class Book {
    public static void main(String args[]) {
        HashMap<Integer, String> hmap = new HashMap<Integer, String>();

        hmap.put(123456"Harry Potter",);
        hmap.put(456789,"Da Vinci Code",);
        hmap.put(123098"The Fault in our Stars",);

        content = new JFrame();
        panel = new JPanel();
        JComboBox cmb;
        cmb = new JComboBox();

        Set set = hmap.entrySet();
        Iterator iterator = set.iterator();

        Set set = hmap.entrySet();
        Iterator iterator = set.iterator();
        while(iterator.hasNext()) {
            Map.Entry map_entry = (Map.Entry)iterator.next();
            cmb.addItem(map_entry.getvalue());
        }

        panel.add(cmb);
        content.add(panel);

        int size = cmb.getItemCount();


        for(int i =0;i<size;i++){
        JDialog d = new JDialog(content, cmb.getItemAt(i));
        d.setSize(200,200);
        d.setVisible(true);
        }
    }
}