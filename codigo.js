import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SmoothMixedBackground extends JPanel {
    private Color[] colors = { 
        new Color(255, 179, 169), // #FEB3A9
        new Color(255, 154, 46),  // #FF9A2E
        new Color(253, 229, 218), // #FDE5DA
        new Color(174, 194, 137)  // #AEC289
    };
    
    private float transitionProgress = 0.0f;
    private Timer timer;

    public SmoothMixedBackground() {
        timer = new Timer(30, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                transitionProgress += 0.01f; // Incrementa el progreso de la transición

                if (transitionProgress >= 1.0f) {
                    transitionProgress = 0.0f;
                }

                repaint();
            }
        });
        timer.start();
    }

    private Color blendColors(float progress) {
        int numColors = colors.length;
        float totalWeight = 0;
        int r = 0, g = 0, b = 0;

        // Mezclar todos los colores
        for (int i = 0; i < numColors; i++) {
            float weight = (float) Math.sin((progress + (float) i / numColors) * Math.PI * 2) * 0.5f + 0.5f; // Peso oscilante
            r += (int) (colors[i].getRed() * weight);
            g += (int) (colors[i].getGreen() * weight);
            b += (int) (colors[i].getBlue() * weight);
            totalWeight += weight;
        }

        // Normalizar el color
        r = (int) (r / totalWeight);
        g = (int) (g / totalWeight);
        b = (int) (b / totalWeight);

        return new Color(r, g, b);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Color blendedColor = blendColors(transitionProgress);
        g.setColor(blendedColor);
        g.fillRect(0, 0, getWidth(), getHeight());
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Smooth Mixed Background");
        SmoothMixedBackground mixedBackground = new SmoothMixedBackground();
        
        frame.add(mixedBackground);
        frame.setSize(800, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}