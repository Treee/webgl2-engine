# webgl2-engine

row major
     m.set( 11, 12, 13,
            21, 22, 23,
            31, 32, 33 ); will result in the elements array containing:
col major (internal)
  m.el  = [ 11, 21, 31,
            12, 22, 32,
            13, 23, 33 ]; and internally all calculations are performed using column-major ordering. 